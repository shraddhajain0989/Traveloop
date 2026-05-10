export const trips = [
  {
    id: "trip_bali",
    title: "Bali Workation Loop",
    status: "Planning",
    cities: ["Ubud", "Canggu", "Uluwatu"],
    startDate: "2026-06-12",
    endDate: "2026-06-24",
    travelers: 4,
    budget: 8420,
    spent: 5210,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "trip_alps",
    title: "Alpine Rail Sprint",
    status: "Booked",
    cities: ["Zurich", "Lucerne", "Interlaken"],
    startDate: "2026-09-03",
    endDate: "2026-09-11",
    travelers: 2,
    budget: 5860,
    spent: 4410,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "trip_japan",
    title: "Kyoto Slow Travel",
    status: "Draft",
    cities: ["Kyoto", "Nara", "Osaka"],
    startDate: "2026-11-01",
    endDate: "2026-11-13",
    travelers: 3,
    budget: 7210,
    spent: 1450,
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=80",
  },
];

export const itineraryStops = [
  {
    id: "stop_ubud",
    day: 1,
    city: "Ubud",
    title: "Arrival, wellness reset, and rice terrace walk",
    activities: ["Airport transfer", "Villa check-in", "Tegallalang sunset"],
  },
  {
    id: "stop_canggu",
    day: 2,
    city: "Canggu",
    title: "Surf, coworking blocks, and local food trail",
    activities: ["Surf lesson", "Cafe work block", "Cooking class"],
  },
  {
    id: "stop_uluwatu",
    day: 3,
    city: "Uluwatu",
    title: "Cliff temples and group dinner",
    activities: ["Temple visit", "Beach club", "Sunset dinner"],
  },
];

export const activities = [
  {
    id: "act_1",
    name: "Rice terrace sunrise walk",
    city: "Ubud",
    category: "Adventure",
    price: 24,
    rating: 4.8,
    duration: "2.5h",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "act_2",
    name: "Balinese cooking class",
    city: "Canggu",
    category: "Food",
    price: 58,
    rating: 4.9,
    duration: "3h",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "act_3",
    name: "Uluwatu cliff dinner",
    city: "Uluwatu",
    category: "Relaxation",
    price: 78,
    rating: 4.7,
    duration: "2h",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "act_4",
    name: "Private surf coaching",
    city: "Canggu",
    category: "Adventure",
    price: 65,
    rating: 4.8,
    duration: "90m",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "act_5",
    name: "Temple heritage walk",
    city: "Kyoto",
    category: "Culture",
    price: 42,
    rating: 4.9,
    duration: "4h",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "act_6",
    name: "Rooftop nightlife pass",
    city: "Lisbon",
    category: "Nightlife",
    price: 55,
    rating: 4.6,
    duration: "5h",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
];

export const budgetCategories = [
  { name: "Flights", amount: 1820 },
  { name: "Hotels", amount: 2540 },
  { name: "Food", amount: 880 },
  { name: "Activities", amount: 690 },
  { name: "Transit", amount: 410 },
];

export const dailySpend = [
  { day: "Mon", planned: 340, actual: 300 },
  { day: "Tue", planned: 280, actual: 330 },
  { day: "Wed", planned: 420, actual: 390 },
  { day: "Thu", planned: 250, actual: 270 },
  { day: "Fri", planned: 380, actual: 410 },
  { day: "Sat", planned: 500, actual: 455 },
];

export const checklist = [
  { id: "check_1", label: "Passport", category: "Documents", packed: true },
  { id: "check_2", label: "Travel Insurance", category: "Documents", packed: true },
  { id: "check_3", label: "Flight Tickets", category: "Documents", packed: false },
  { id: "check_4", label: "T-Shirts (5)", category: "Clothing", packed: false },
  { id: "check_5", label: "Jeans (2)", category: "Clothing", packed: false },
  { id: "check_6", label: "Underwear (7)", category: "Clothing", packed: false },
  { id: "check_7", label: "Toothbrush", category: "Toiletries", packed: true },
  { id: "check_8", label: "Sunscreen", category: "Toiletries", packed: false },
  { id: "check_9", label: "Phone Charger", category: "Electronics", packed: false },
  { id: "check_10", label: "Camera", category: "Electronics", packed: false },
];

export const notes = [
  {
    id: "note_1",
    title: "Hotel logistics",
    body: "Ask for late checkout and two desks in the villa common area.",
    day: "Day 1",
  },
  {
    id: "note_2",
    title: "Food preferences",
    body: "Two travelers prefer vegetarian options for group dinners.",
    day: "Day 2",
  },
];

export const destinations = [
  { id: "city_goa", name: "Goa", country: "India", rating: 4.8, dailyBudget: 72, season: "November - February", tags: ["Beach", "Nightlife", "Food"], description: "Sunset beaches, cafe culture, and a relaxed coastal rhythm for short escapes and remote work.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_manali", name: "Manali", country: "India", rating: 4.7, dailyBudget: 68, season: "March - June", tags: ["Mountains", "Adventure", "Road Trip"], description: "Cool mountain air, river valleys, and easy access to trekking and alpine drives.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_ladakh", name: "Ladakh", country: "India", rating: 4.9, dailyBudget: 110, season: "June - September", tags: ["High Altitude", "Scenic", "Biking"], description: "Dramatic passes, monastery circuits, and cinematic road journeys across the Himalayas.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1626621331169-5f34f6d57b38?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_jaipur", name: "Jaipur", country: "India", rating: 4.6, dailyBudget: 64, season: "October - March", tags: ["Heritage", "Markets", "Architecture"], description: "Pink facades, royal courtyards, and lively bazaars packed with crafts and food trails.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_kerala", name: "Kerala", country: "India", rating: 4.8, dailyBudget: 78, season: "September - March", tags: ["Backwaters", "Wellness", "Nature"], description: "Houseboats, spice plantations, and slow scenic days across backwaters and hills.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_rishikesh", name: "Rishikesh", country: "India", rating: 4.7, dailyBudget: 52, season: "October - April", tags: ["Yoga", "River", "Wellness"], description: "A spiritual river town with yoga retreats, rafting, and calm mornings in the foothills.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_andaman", name: "Andaman", country: "India", rating: 4.8, dailyBudget: 96, season: "November - May", tags: ["Island", "Snorkeling", "Beach"], description: "Turquoise water, marine life, and laid-back island days across pristine beaches.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_udaipur", name: "Udaipur", country: "India", rating: 4.7, dailyBudget: 70, season: "October - March", tags: ["Lakes", "Palaces", "Romantic"], description: "Lake views, palace stays, and a calm heritage atmosphere built for slow luxury.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_mumbai", name: "Mumbai", country: "India", rating: 4.5, dailyBudget: 88, season: "November - February", tags: ["City", "Food", "Nightlife"], description: "Fast-paced energy, iconic seafronts, and one of the strongest food scenes in the region.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_darjeeling", name: "Darjeeling", country: "India", rating: 4.6, dailyBudget: 58, season: "March - May", tags: ["Tea", "Hills", "Scenic Rail"], description: "Tea gardens, toy train nostalgia, and misty Himalayan viewpoints.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_varanasi", name: "Varanasi", country: "India", rating: 4.7, dailyBudget: 55, season: "October - March", tags: ["Culture", "Spiritual", "History"], description: "Sacred ghats, sunrise boat rides, and one of the world’s oldest living cities.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_pondicherry", name: "Pondicherry", country: "India", rating: 4.5, dailyBudget: 60, season: "October - March", tags: ["French Quarter", "Beach", "Cafe"], description: "Pastel streets, seafront walks, and a mellow fusion of Tamil and French character.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1625908734973-c3e5f7bcebf8?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_paris", name: "Paris", country: "France", rating: 4.8, dailyBudget: 210, season: "April - June", tags: ["Museums", "Cafe", "Romance"], description: "Art, architecture, and long neighborhood walks woven through classic boulevards.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_rome", name: "Rome", country: "Italy", rating: 4.8, dailyBudget: 185, season: "April - June", tags: ["History", "Food", "Walkable"], description: "Ancient ruins, piazza culture, and rich Roman comfort food around every corner.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_dubai", name: "Dubai", country: "UAE", rating: 4.7, dailyBudget: 220, season: "November - March", tags: ["Luxury", "Skyline", "Shopping"], description: "Sky-high cityscapes, polished hospitality, and desert-to-marina contrasts.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_singapore", name: "Singapore", country: "Singapore", rating: 4.8, dailyBudget: 205, season: "February - April", tags: ["Clean", "Food", "Urban"], description: "Hyper-efficient transit, iconic gardens, and one of the world’s best hawker scenes.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_bangkok", name: "Bangkok", country: "Thailand", rating: 4.7, dailyBudget: 92, season: "November - February", tags: ["Street Food", "Nightlife", "Temples"], description: "Bustling canals, neon nights, and legendary street food from dawn until late.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_london", name: "London", country: "United Kingdom", rating: 4.7, dailyBudget: 225, season: "May - September", tags: ["Museums", "Parks", "Theatre"], description: "Historic neighborhoods, green escapes, and a deep mix of global culture.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_new_york", name: "New York", country: "United States", rating: 4.8, dailyBudget: 245, season: "April - June", tags: ["City", "Broadway", "Food"], description: "Big-city momentum, iconic skylines, and neighborhood-by-neighborhood discovery.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_seoul", name: "Seoul", country: "South Korea", rating: 4.8, dailyBudget: 150, season: "March - May", tags: ["K-Culture", "Food", "Night Markets"], description: "Palaces, nightlife, and a high-energy blend of tech, culture, and street eats.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_tokyo", name: "Tokyo", country: "Japan", rating: 4.9, dailyBudget: 210, season: "March - May", tags: ["Culture", "Food", "Transit"], description: "Precision transit, dense neighborhoods, and endless layers of dining and design.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_barcelona", name: "Barcelona", country: "Spain", rating: 4.7, dailyBudget: 168, season: "May - July", tags: ["Architecture", "Beach", "Nightlife"], description: "Gaudi landmarks, beach energy, and late dinners that spill into lively streets.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_istanbul", name: "Istanbul", country: "Turkey", rating: 4.8, dailyBudget: 108, season: "April - June", tags: ["Bazaar", "History", "Food"], description: "Layered empires, ferry crossings, and rich food culture between two continents.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_amsterdam", name: "Amsterdam", country: "Netherlands", rating: 4.7, dailyBudget: 190, season: "April - June", tags: ["Canals", "Museums", "Cycling"], description: "Canal-side neighborhoods, bike-first mobility, and compact cultural depth.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_sydney", name: "Sydney", country: "Australia", rating: 4.8, dailyBudget: 230, season: "September - November", tags: ["Harbour", "Beach", "Outdoors"], description: "Harbour views, coastal walks, and polished urban life with outdoor ease.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1506973035872-a4f23ef8e834?auto=format&fit=crop&w=1200&q=80" },
  { id: "city_maldives", name: "Maldives", country: "Maldives", rating: 4.9, dailyBudget: 320, season: "November - April", tags: ["Luxury", "Island", "Diving"], description: "Overwater stays, bright reefs, and a premium slow-travel reset in turquoise waters.", baseCurrency: "USD", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80" },
];

export const adminMetrics = [
  { label: "Total users", value: "48.2K", delta: "+22%" },
  { label: "Active trips", value: "12.8K", delta: "+18%" },
  { label: "Completed trips", value: "31.4K", delta: "+14%" },
  { label: "Engagement rate", value: "71%", delta: "+9%" },
];

export const userGrowth = [
  { day: "Jan", planned: 1200, actual: 1400 },
  { day: "Feb", planned: 1600, actual: 1900 },
  { day: "Mar", planned: 2100, actual: 2600 },
  { day: "Apr", planned: 2800, actual: 3300 },
  { day: "May", planned: 3600, actual: 4200 },
  { day: "Jun", planned: 4300, actual: 5100 },
];

export const monthlySpend = [
  { day: "Jan", amount: 1200 },
  { day: "Feb", amount: 800 },
  { day: "Mar", amount: 3000 },
  { day: "Apr", amount: 0 },
  { day: "May", amount: 1500 },
  { day: "Jun", amount: 3300 },
];

export const cityCounts = [
  { day: "Paris", count: 2400 },
  { day: "Tokyo", count: 2000 },
  { day: "Bali", count: 1600 },
  { day: "Barcelona", count: 1400 },
  { day: "New York", count: 1300 },
];
