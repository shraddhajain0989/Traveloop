import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { tripApi } from "@/features/trips/api/tripApi";
import { useAuth } from "./AuthProvider";
import { tokenService } from "@/shared/services/tokenService";
import { toTripPayload, transformTrip } from "@/features/trips/utils/tripTransformers";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTrips = useCallback(async () => {
    if (!tokenService.getToken()) {
      setTrips([]);
      setSelectedTripId(null);
      return [];
    }

    setLoading(true);
    try {
      const response = await tripApi.list();
      const nextTrips = (response.data?.data || []).map(transformTrip);
      setTrips(nextTrips);
      setSelectedTripId((current) => current || nextTrips[0]?.id || null);
      return nextTrips;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips().catch(() => {
      setTrips([]);
      setSelectedTripId(null);
    });
  }, [isAuthenticated, loadTrips]);

  const addTrip = useCallback(
    async (tripData) => {
      const response = await tripApi.create(toTripPayload(tripData));
      const newTrip = transformTrip(response.data?.data);
      setTrips((current) => [newTrip, ...current]);
      setSelectedTripId((current) => current || newTrip.id);
      return newTrip;
    },
    []
  );

  const updateTrip = useCallback(
    async (id, data) => {
      const response = await tripApi.update(id, toTripPayload(data));
      const updatedTrip = transformTrip(response.data?.data);
      setTrips((current) => current.map((trip) => (trip.id === id ? updatedTrip : trip)));
      return updatedTrip;
    },
    []
  );

  const deleteTrip = useCallback(
    async (id) => {
      await tripApi.delete(id);
      setTrips((current) => {
        const nextTrips = current.filter((trip) => trip.id !== id);
        setSelectedTripId((selected) => (selected === id ? nextTrips[0]?.id || null : selected));
        return nextTrips;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      trips,
      loading,
      selectedTripId,
      setSelectedTripId,
      loadTrips,
      addTrip,
      updateTrip,
      deleteTrip,
    }),
    [trips, loading, selectedTripId, loadTrips, addTrip, updateTrip, deleteTrip]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTripContext() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTripContext must be used inside TripProvider");
  return ctx;
}
