import { useEffect, useState } from "react";
import { storage } from "@/shared/lib/storage";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storage.get(key, initialValue));

  useEffect(() => {
    storage.set(key, value);
  }, [key, value]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key) return;
      setValue(storage.get(key, initialValue));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [initialValue, key]);

  return [value, setValue];
}
