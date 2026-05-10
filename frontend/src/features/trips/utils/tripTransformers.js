export function tripToOption(trip) {
  return { label: trip.title, value: trip.id };
}

const fallbackImage =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80";

export function transformTrip(trip) {
  const cities = trip?.stops?.map((stop) => stop.city).filter(Boolean) || [];
  return {
    id: String(trip.id),
    rawId: trip.id,
    title: trip.title,
    status: trip.is_public ? "Booked" : "Planning",
    cities,
    startDate: trip.start_date,
    endDate: trip.end_date,
    travelers: trip.travelers_count || 1,
    budget: Number(trip.budget?.total_budget || 0),
    spent: Number(trip.budget?.spent_amount || 0),
    image: fallbackImage,
    shareId: trip.share_id,
    isPublic: trip.is_public,
    description: trip.description,
    transportMode: trip.transport_mode,
    originCity: trip.origin_city,
    stops: (trip.stops || []).map((stop, index) => ({
      id: String(stop.id),
      day: index + 1,
      city: stop.city,
      title: stop.notes || `${stop.city} itinerary`,
      activities: (stop.activities || []).map((activity) => activity.title),
      rawActivities: stop.activities || [],
      arrivalDate: stop.arrival_date,
      departureDate: stop.departure_date,
    })),
  };
}

export function toTripPayload(trip) {
  const cities = Array.isArray(trip.cities)
    ? trip.cities
    : (trip.destinations || "")
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean);

  return {
    title: trip.title,
    description: trip.description || null,
    start_date: trip.startDate || trip.start_date || null,
    end_date: trip.endDate || trip.end_date || null,
    travelers_count: Number(trip.travelers || trip.travelers_count || 1),
    transport_mode: trip.transport || trip.transportMode || trip.transport_mode || "Flights + private transfer",
    is_public: trip.status === "Booked" || Boolean(trip.isPublic || trip.is_public),
    cities,
    stops: cities.map((city, index) => ({
      city,
      position: index,
    })),
    budget: {
      total_budget: Number(trip.budget || trip.total_budget || 0),
      spent_amount: Number(trip.spent || trip.spent_amount || 0),
      currency: trip.currency || "USD",
    },
  };
}
