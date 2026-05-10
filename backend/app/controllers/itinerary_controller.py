import os
import json
from flask import jsonify, request
from openai import OpenAI
from app.config.db import db
from app.models.city_model import City
from app.models.itinerary_template_model import ItineraryTemplate

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

def generate_itinerary():
    data = request.json
    city_name = data.get("city")
    days = data.get("days", 3)
    travel_type = data.get("travelType", "budget")

    if not city_name:
        return jsonify({"success": False, "message": "City is required"}), 400

    # Ensure city exists
    city = City.query.filter(City.name.ilike(city_name)).first()
    if not city:
        city = City(name=city_name)
        db.session.add(city)
        db.session.commit()

    # Check cache first
    existing_template = ItineraryTemplate.query.filter_by(
        city_id=city.id, days=days, travel_type=travel_type
    ).first()

    if existing_template:
        return jsonify({"success": True, "data": {"itinerary": existing_template.itinerary_data}}), 200

    # If no API key, return a mock response for UI development
    if not client:
        mock_itinerary = [
            {
                "day": d + 1,
                "title": f"Day {d + 1} Exploring {city_name}",
                "activities": [
                    {"time": "Morning", "place": f"{city_name} Central Park", "description": "Start your day with a lovely walk."},
                    {"time": "Afternoon", "place": f"Historic Downtown {city_name}", "description": "Explore local shops and cafes."},
                    {"time": "Evening", "place": f"{city_name} Night Market", "description": "Enjoy local street food."}
                ]
            } for d in range(days)
        ]
        return jsonify({"success": True, "data": {"itinerary": mock_itinerary}}), 200

    # Use OpenAI API to generate itinerary
    try:
        prompt = f"""
        You are an expert travel planner. Create a {days}-day itinerary for {city_name}.
        The travel style is '{travel_type}'.
        Provide the response strictly as a JSON array of objects.
        Each object must represent a day, and have:
        - "day": integer
        - "title": string (theme of the day)
        - "activities": array of objects with "time" (e.g. "Morning", "Afternoon", "Evening"), "place" (name of attraction/restaurant), and "description".
        Only return the JSON array, no extra text.
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        content = response.choices[0].message.content.strip()
        # Parse JSON
        if content.startswith("```json"):
            content = content[7:-3]
        itinerary_data = json.loads(content)

        # Cache the result
        template = ItineraryTemplate(
            city_id=city.id,
            days=days,
            travel_type=travel_type,
            itinerary_data=itinerary_data
        )
        db.session.add(template)
        db.session.commit()

        return jsonify({"success": True, "data": {"itinerary": itinerary_data}}), 200

    except Exception as e:
        print("Error generating itinerary:", e)
        return jsonify({"success": False, "message": "Failed to generate itinerary"}), 500
