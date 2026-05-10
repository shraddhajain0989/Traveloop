import os
import requests
from flask import jsonify, request
from sqlalchemy import or_
from app.config.db import db
from app.models.city_model import City

UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")

# ──────────────────────────────────────────────
#  City-specific search queries for Unsplash / Pexels
#  These are carefully crafted to return the EXACT destination
# ──────────────────────────────────────────────
CITY_SEARCH_QUERIES = {
    "mumbai":       "Mumbai Marine Drive Gateway of India skyline India travel",
    "delhi":        "Delhi India Red Fort Qutub Minar New Delhi travel",
    "bangalore":    "Bangalore Cubbon Park MG Road Bangalore India cityscape",
    "goa":          "Goa beach Anjuna Calangute aerial India ocean sunset",
    "pondicherry":  "Pondicherry French quarter beach promenade India pastel streets",
    "chennai":      "Chennai Marina Beach India city tourism travel",
    "jaipur":       "Jaipur Hawa Mahal Amber Fort Pink City Rajasthan India",
    "udaipur":      "Udaipur City Palace lake Rajasthan India romantic travel",
    "varanasi":     "Varanasi ghats Ganga river sunrise India spiritual",
    "kerala":       "Kerala backwaters houseboat India green nature travel",
    "ladakh":       "Ladakh mountains monastery Pangong lake India Himalayas",
    "manali":       "Manali Rohtang Pass mountains India snow Himalayas travel",
    "rishikesh":    "Rishikesh Ganga river yoga India bridge Himalayan foothill",
    "darjeeling":   "Darjeeling tea garden toy train Himalaya India scenic",
    "andaman":      "Andaman islands turquoise water Radhanagar beach snorkeling India",
    "paris":        "Paris Eiffel Tower city skyline France travel landmark",
    "rome":         "Rome Colosseum Vatican Italy ancient ruins cityscape",
    "dubai":        "Dubai Burj Khalifa skyline UAE city modern travel",
    "singapore":    "Singapore Marina Bay Sands city skyline travel asia",
    "bangkok":      "Bangkok Wat Phra Kaew Grand Palace Thailand city travel",
    "london":       "London Big Ben Tower Bridge England city skyline travel",
    "new york":     "New York City Manhattan skyline Times Square USA travel",
    "seoul":        "Seoul city skyline Gyeongbokgung Korea N Seoul Tower travel",
    "tokyo":        "Tokyo Japan Shibuya city skyline Mount Fuji travel",
    "barcelona":    "Barcelona Sagrada Familia Gaudi Spain beach city travel",
    "istanbul":     "Istanbul Blue Mosque Bosphorus Turkey city travel landmark",
    "amsterdam":    "Amsterdam canal bike Netherlands Europe travel",
    "sydney":       "Sydney Opera House Harbour Bridge Australia city skyline",
    "maldives":     "Maldives overwater bungalow turquoise lagoon island luxury",
    "bali":         "Bali Tanah Lot Ubud rice terraces Indonesia travel scenic",
    "kyoto":        "Kyoto temple Arashiyama bamboo geisha Japan travel",
    "santorini":    "Santorini white dome blue aegean sea Greece travel",
    "zurich":       "Zurich city lake Switzerland old town travel",
    "lisbon":       "Lisbon tram Alfama Portugal city travel colourful",
    "ubud":         "Ubud Bali rice terraces Tegalalang Indonesia green travel",
}

# Curated high-quality fallback images per city (Unsplash direct URLs - no API key needed)
CURATED_FALLBACKS = {
    "mumbai":       "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=85",
    "delhi":        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=85",
    "bangalore":    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&q=85",
    "goa":          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=85",
    "pondicherry":  "https://images.unsplash.com/photo-1625908734973-c3e5f7bcebf8?w=1200&q=85",
    "chennai":      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=85",
    "jaipur":       "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=85",
    "udaipur":      "https://images.unsplash.com/photo-1621323393959-ea42e9a9b7e3?w=1200&q=85",
    "varanasi":     "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=85",
    "kerala":       "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=85",
    "ladakh":       "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=85",
    "manali":       "https://images.unsplash.com/photo-1626621331169-5f34f6d57b38?w=1200&q=85",
    "rishikesh":    "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200&q=85",
    "darjeeling":   "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=85",
    "andaman":      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
    "paris":        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85",
    "rome":         "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85",
    "dubai":        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85",
    "singapore":    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=85",
    "bangkok":      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=85",
    "london":       "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85",
    "new york":     "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=1200&q=85",
    "seoul":        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&q=85",
    "tokyo":        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85",
    "barcelona":    "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=1200&q=85",
    "istanbul":     "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=85",
    "amsterdam":    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=85",
    "sydney":       "https://images.unsplash.com/photo-1506973035872-a4f23ef8e834?w=1200&q=85",
    "maldives":     "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85",
    "bali":         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85",
    "kyoto":        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=85",
    "santorini":    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
    "zurich":       "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=85",
    "lisbon":       "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=85",
    "ubud":         "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=1200&q=85",
}

# Thumbnail versions (smaller, faster for autocomplete)
CURATED_THUMBNAILS = {
    k: v.replace("w=1200", "w=400").replace("q=85", "q=70")
    for k, v in CURATED_FALLBACKS.items()
}

# ──────────────────────────────────────────────
#  Enriched city metadata for autocomplete
# ──────────────────────────────────────────────
POPULAR_CITIES = [
    {"name": "Mumbai",      "country": "India",        "state": "Maharashtra",  "flag": "🇮🇳"},
    {"name": "Delhi",       "country": "India",        "state": "Delhi",        "flag": "🇮🇳"},
    {"name": "Bangalore",   "country": "India",        "state": "Karnataka",    "flag": "🇮🇳"},
    {"name": "Goa",         "country": "India",        "state": "Goa",          "flag": "🇮🇳"},
    {"name": "Pondicherry", "country": "India",        "state": "Puducherry",   "flag": "🇮🇳"},
    {"name": "Chennai",     "country": "India",        "state": "Tamil Nadu",   "flag": "🇮🇳"},
    {"name": "Jaipur",      "country": "India",        "state": "Rajasthan",    "flag": "🇮🇳"},
    {"name": "Udaipur",     "country": "India",        "state": "Rajasthan",    "flag": "🇮🇳"},
    {"name": "Varanasi",    "country": "India",        "state": "Uttar Pradesh","flag": "🇮🇳"},
    {"name": "Kerala",      "country": "India",        "state": "Kerala",       "flag": "🇮🇳"},
    {"name": "Ladakh",      "country": "India",        "state": "Ladakh",       "flag": "🇮🇳"},
    {"name": "Manali",      "country": "India",        "state": "Himachal Pradesh","flag": "🇮🇳"},
    {"name": "Rishikesh",   "country": "India",        "state": "Uttarakhand",  "flag": "🇮🇳"},
    {"name": "Darjeeling",  "country": "India",        "state": "West Bengal",  "flag": "🇮🇳"},
    {"name": "Andaman",     "country": "India",        "state": "Andaman & Nicobar","flag": "🇮🇳"},
    {"name": "Paris",       "country": "France",       "state": "",             "flag": "🇫🇷"},
    {"name": "Rome",        "country": "Italy",        "state": "",             "flag": "🇮🇹"},
    {"name": "Dubai",       "country": "UAE",          "state": "",             "flag": "🇦🇪"},
    {"name": "Singapore",   "country": "Singapore",    "state": "",             "flag": "🇸🇬"},
    {"name": "Bangkok",     "country": "Thailand",     "state": "",             "flag": "🇹🇭"},
    {"name": "London",      "country": "UK",           "state": "",             "flag": "🇬🇧"},
    {"name": "New York",    "country": "USA",          "state": "New York",     "flag": "🇺🇸"},
    {"name": "Seoul",       "country": "South Korea",  "state": "",             "flag": "🇰🇷"},
    {"name": "Tokyo",       "country": "Japan",        "state": "",             "flag": "🇯🇵"},
    {"name": "Barcelona",   "country": "Spain",        "state": "",             "flag": "🇪🇸"},
    {"name": "Istanbul",    "country": "Turkey",       "state": "",             "flag": "🇹🇷"},
    {"name": "Amsterdam",   "country": "Netherlands",  "state": "",             "flag": "🇳🇱"},
    {"name": "Sydney",      "country": "Australia",    "state": "New South Wales","flag": "🇦🇺"},
    {"name": "Maldives",    "country": "Maldives",     "state": "",             "flag": "🇲🇻"},
    {"name": "Bali",        "country": "Indonesia",    "state": "",             "flag": "🇮🇩"},
    {"name": "Kyoto",       "country": "Japan",        "state": "",             "flag": "🇯🇵"},
    {"name": "Santorini",   "country": "Greece",       "state": "",             "flag": "🇬🇷"},
    {"name": "Zurich",      "country": "Switzerland",  "state": "",             "flag": "🇨🇭"},
    {"name": "Lisbon",      "country": "Portugal",     "state": "",             "flag": "🇵🇹"},
    {"name": "Ubud",        "country": "Indonesia",    "state": "Bali",         "flag": "🇮🇩"},
]

def _get_search_query(city_name: str) -> str:
    """Return a highly specific travel search query for a city."""
    key = city_name.strip().lower()
    return CITY_SEARCH_QUERIES.get(key, f"{city_name} city tourism travel landmark skyline")

def _get_curated_image(city_name: str, thumbnail=False) -> str | None:
    """Return curated high-quality image URL for known cities."""
    key = city_name.strip().lower()
    source = CURATED_THUMBNAILS if thumbnail else CURATED_FALLBACKS
    return source.get(key)

def _fetch_from_unsplash(city_name: str, thumbnail=False) -> str | None:
    """Fetch a relevant city image from Unsplash API."""
    if not UNSPLASH_ACCESS_KEY:
        return None
    try:
        query = _get_search_query(city_name)
        url = "https://api.unsplash.com/search/photos"
        params = {
            "query": query,
            "client_id": UNSPLASH_ACCESS_KEY,
            "per_page": 5,
            "orientation": "landscape",
            "content_filter": "high"
        }
        response = requests.get(url, params=params, timeout=6)
        if response.status_code == 200:
            data = response.json()
            results = data.get("results", [])
            if results:
                photo = results[0]
                return photo["urls"]["small"] if thumbnail else photo["urls"]["regular"]
    except Exception as e:
        print(f"[Unsplash] Error for {city_name}: {e}")
    return None

def _fetch_from_pexels(city_name: str, thumbnail=False) -> str | None:
    """Fetch a relevant city image from Pexels API."""
    if not PEXELS_API_KEY:
        return None
    try:
        query = _get_search_query(city_name)
        url = "https://api.pexels.com/v1/search"
        headers = {"Authorization": PEXELS_API_KEY}
        params = {
            "query": query,
            "per_page": 5,
            "orientation": "landscape"
        }
        response = requests.get(url, headers=headers, params=params, timeout=6)
        if response.status_code == 200:
            data = response.json()
            photos = data.get("photos", [])
            if photos:
                photo = photos[0]
                return photo["src"]["medium"] if thumbnail else photo["src"]["large"]
    except Exception as e:
        print(f"[Pexels] Error for {city_name}: {e}")
    return None


# ──────────────────────────────────────────────
#  Route handlers
# ──────────────────────────────────────────────

def search_cities():
    query = request.args.get("q", "").strip().lower()

    if query:
        results = [
            c for c in POPULAR_CITIES
            if query in c["name"].lower() or query in c["country"].lower() or query in c.get("state", "").lower()
        ]
    else:
        results = POPULAR_CITIES[:12]

    # Enrich with thumbnail images from curated list or DB cache
    enriched = []
    for c in results[:10]:
        city_key = c["name"].lower()
        thumbnail = CURATED_THUMBNAILS.get(city_key)
        # Try DB cache if not in curated list
        if not thumbnail:
            db_city = City.query.filter(City.name.ilike(c["name"])).first()
            if db_city and db_city.image_url:
                thumbnail = db_city.image_url

        enriched.append({
            **c,
            "thumbnail": thumbnail or ""
        })

    # Also search DB for any user-added cities
    if query:
        db_cities = City.query.filter(or_(
            City.name.ilike(f"%{query}%"),
            City.country.ilike(f"%{query}%")
        )).limit(5).all()
        for db_city in db_cities:
            if not any(r["name"].lower() == db_city.name.lower() for r in enriched):
                enriched.append({
                    "name": db_city.name,
                    "country": db_city.country or "",
                    "state": "",
                    "flag": "🌍",
                    "thumbnail": db_city.image_url or ""
                })

    return jsonify({"success": True, "data": enriched[:10]}), 200


def fetch_city_image():
    city_name = request.args.get("city", "").strip()
    thumbnail = request.args.get("thumbnail", "false").lower() == "true"

    if not city_name:
        return jsonify({"success": False, "message": "City parameter is required"}), 400

    # 1. Check DB cache first (only for full images, not thumbnails)
    if not thumbnail:
        city = City.query.filter(City.name.ilike(city_name)).first()
        if city and city.image_url:
            return jsonify({
                "success": True,
                "data": {
                    "city": city.name,
                    "imageUrl": city.image_url,
                    "thumbnail": _get_curated_image(city_name, thumbnail=True) or city.image_url
                }
            }), 200

    # 2. Try curated list first (instant, no API call needed)
    curated = _get_curated_image(city_name, thumbnail=thumbnail)
    if curated:
        # Also save to DB if not thumbnail
        if not thumbnail:
            city = City.query.filter(City.name.ilike(city_name)).first()
            full_url = _get_curated_image(city_name, thumbnail=False)
            if not city:
                city = City(name=city_name, image_url=full_url)
                db.session.add(city)
            else:
                city.image_url = full_url
            db.session.commit()
        return jsonify({
            "success": True,
            "data": {
                "city": city_name,
                "imageUrl": curated,
                "thumbnail": _get_curated_image(city_name, thumbnail=True) or curated,
                "source": "curated"
            }
        }), 200

    # 3. Try Unsplash API
    image_url = _fetch_from_unsplash(city_name, thumbnail=thumbnail)

    # 4. Try Pexels API
    if not image_url:
        image_url = _fetch_from_pexels(city_name, thumbnail=thumbnail)

    # 5. Generic fallback
    if not image_url:
        image_url = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"

    # Save to DB
    if not thumbnail:
        city = City.query.filter(City.name.ilike(city_name)).first()
        if not city:
            city = City(name=city_name, image_url=image_url)
            db.session.add(city)
        else:
            city.image_url = image_url
        db.session.commit()

    return jsonify({
        "success": True,
        "data": {
            "city": city_name,
            "imageUrl": image_url,
            "thumbnail": image_url,
            "source": "api"
        }
    }), 200
