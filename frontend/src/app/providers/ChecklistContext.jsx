import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTripContext } from "./TripContext";
import { checklistApi } from "@/features/checklist/api/checklistApi";

const ChecklistContext = createContext(null);

export function ChecklistProvider({ children }) {
  const { trips, selectedTripId } = useTripContext();
  const [items, setItems] = useState([]);
  const activeTripId = selectedTripId || trips[0]?.id || null;

  const loadItems = useCallback(async () => {
    if (!activeTripId) {
      setItems([]);
      return [];
    }
    const response = await checklistApi.list(activeTripId);
    const nextItems = (response.data?.data || []).map((item) => ({
      id: item.id,
      label: item.item_name,
      category: item.category || "General",
      packed: item.is_checked,
    }));
    setItems(nextItems);
    return nextItems;
  }, [activeTripId]);

  useEffect(() => {
    loadItems().catch(() => setItems([]));
  }, [loadItems]);

  const toggleItem = useCallback(
    async (id) => {
      const currentItem = items.find((item) => item.id === id);
      if (!currentItem) return null;
      const response = await checklistApi.update(id, { is_checked: !currentItem.packed });
      const updated = response.data?.data;
      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                id: updated.id,
                label: updated.item_name,
                category: updated.category || "General",
                packed: updated.is_checked,
              }
            : item
        )
      );
      return updated;
    },
    [items]
  );

  const addItem = useCallback(
    async (label, category) => {
      if (!label.trim() || !activeTripId) return false;
      const response = await checklistApi.add({
        trip_id: activeTripId,
        item_name: label.trim(),
        category,
        is_checked: false,
      });
      const created = response.data?.data;
      setItems((current) => [
        ...current,
        {
          id: created.id,
          label: created.item_name,
          category: created.category || "General",
          packed: created.is_checked,
        },
      ]);
      return true;
    },
    [activeTripId]
  );

  const deleteItem = useCallback(
    async (id) => {
      await checklistApi.delete(id);
      setItems((current) => current.filter((item) => item.id !== id));
    },
    []
  );

  const value = useMemo(
    () => ({ items, activeTripId, loadItems, toggleItem, addItem, deleteItem }),
    [items, activeTripId, loadItems, toggleItem, addItem, deleteItem]
  );

  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>;
}

export function useChecklistContext() {
  const ctx = useContext(ChecklistContext);
  if (!ctx) throw new Error("useChecklistContext must be used inside ChecklistProvider");
  return ctx;
}
