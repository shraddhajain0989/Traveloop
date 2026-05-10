import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, X, Search, Loader2, CheckCircle2 } from "lucide-react";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { cn } from "@/shared/lib/cn";
import { apiClient } from "@/shared/services/axios";

/** Small cache so we don't re-hit the API for the same query */
const queryCache = new Map();

export function DestinationInput({ value = [], onChange, error }) {
  const { t } = useSettingsContext();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const fetchSuggestions = useCallback(async (q) => {
    const cacheKey = q.trim().toLowerCase();
    if (queryCache.has(cacheKey)) {
      setSuggestions(queryCache.get(cacheKey).filter(c => !value.includes(c.name)));
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.get(`/cities/search?q=${encodeURIComponent(q)}`);
      if (res.data?.success) {
        const data = res.data.data;
        queryCache.set(cacheKey, data);
        setSuggestions(data.filter(c => !value.includes(c.name)));
      }
    } catch (err) {
      console.error("Error fetching cities", err);
    } finally {
      setLoading(false);
    }
  }, [value]);

  useEffect(() => {
    const id = setTimeout(() => fetchSuggestions(query), 200);
    return () => clearTimeout(id);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const fn = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const addCity = (name) => {
    if (!value.includes(name)) onChange([...value, name]);
    setQuery("");
    inputRef.current?.focus();
    setOpen(true);
  };

  const removeCity = (name) => onChange(value.filter(v => v !== name));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const match = suggestions.find(s => s.name.toLowerCase() === query.toLowerCase());
      if (match) addCity(match.name);
      else if (query.trim()) addCity(query.trim());
    }
    if (e.key === "Backspace" && !query && value.length > 0) {
      removeCity(value[value.length - 1]);
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        Destinations
      </label>

      <div
        className={cn(
          "flex min-h-[50px] flex-wrap items-center gap-2 rounded-2xl border bg-white/90 px-3 py-2 transition cursor-text dark:bg-slate-700",
          error ? "border-red-400 ring-4 ring-red-100" :
          focused ? "border-brand-500 ring-4 ring-brand-100 dark:ring-brand-900/30" :
          "border-slate-200 dark:border-slate-600"
        )}
        onClick={() => { inputRef.current?.focus(); setOpen(true); }}
      >
        {value.map(city => (
          <span key={city} className="flex items-center gap-1.5 rounded-full bg-brand-50 pl-2 pr-1 py-1 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            <MapPin size={12} />
            {city}
            <button
              type="button"
              aria-label={`Remove ${city}`}
              onClick={(e) => { e.stopPropagation(); removeCity(city); }}
              className="grid h-4 w-4 place-items-center rounded-full hover:bg-brand-200 dark:hover:bg-brand-800 transition"
            >
              <X size={10} />
            </button>
          </span>
        ))}

        <div className="flex flex-1 items-center gap-1 min-w-[120px]">
          {loading ? (
            <Loader2 size={14} className="flex-shrink-0 animate-spin text-brand-500" />
          ) : (
            <Search size={14} className="flex-shrink-0 text-slate-400" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => { setFocused(true); setOpen(true); fetchSuggestions(query); }}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? t("destinations", "Search destinations…") : t("addStop", "Add another city…")}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
          />
        </div>
      </div>

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] dark:border-slate-700 dark:bg-slate-800">
          {suggestions.map(dest => {
            const isAdded = value.includes(dest.name);
            return (
              <button
                key={dest.name}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); if (!isAdded) addCity(dest.name); }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/60",
                  isAdded && "opacity-50 cursor-not-allowed"
                )}
                disabled={isAdded}
              >
                {/* City thumbnail */}
                <div className="h-11 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700">
                  {dest.thumbnail ? (
                    <img
                      src={dest.thumbnail}
                      alt={dest.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xl">{dest.flag}</div>
                  )}
                </div>

                {/* City info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink dark:text-white truncate">{dest.name}</p>
                  <p className="text-xs text-slate-400 truncate">
                    {dest.flag} {dest.state ? `${dest.state}, ` : ""}{dest.country}
                  </p>
                </div>

                {isAdded && (
                  <CheckCircle2 size={16} className="flex-shrink-0 text-brand-500" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
