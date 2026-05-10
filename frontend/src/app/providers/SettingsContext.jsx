import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { translations } from "@/shared/constants/translations";

const SettingsContext = createContext(null);

const LANGUAGE_META = {
  English: { code: "en", locale: "en-US" },
  Hindi: { code: "hi", locale: "hi-IN" },
  Japanese: { code: "ja", locale: "ja-JP" },
  Spanish: { code: "es", locale: "es-ES" },
  French: { code: "fr", locale: "fr-FR" },
};

const CURRENCY_OPTIONS = [
  { code: "USD", label: "USD - US Dollar", locale: "en-US", rate: 1 },
  { code: "INR", label: "INR - Indian Rupee", locale: "en-IN", rate: 83.1 },
  { code: "EUR", label: "EUR - Euro", locale: "de-DE", rate: 0.92 },
  { code: "GBP", label: "GBP - British Pound", locale: "en-GB", rate: 0.79 },
  { code: "JPY", label: "JPY - Japanese Yen", locale: "ja-JP", rate: 156.5 },
  { code: "AUD", label: "AUD - Australian Dollar", locale: "en-AU", rate: 1.52 },
  { code: "CAD", label: "CAD - Canadian Dollar", locale: "en-CA", rate: 1.37 },
  { code: "CHF", label: "CHF - Swiss Franc", locale: "de-CH", rate: 0.91 },
];

const defaultSettings = {
  language: "English",
  currency: "USD - US Dollar",
  timezone: "Asia/Kolkata",
  twoFAEnabled: false,
  notifications: {
    tripReminders: true,
    budgetAlerts: true,
    sharedItineraries: false,
    newsletter: false,
  },
};

const CURRENCY_BY_LABEL = Object.fromEntries(CURRENCY_OPTIONS.map((option) => [option.label, option]));

function normalizeSettings(settings) {
  const normalizedLanguage = LANGUAGE_META[settings?.language] ? settings.language : defaultSettings.language;
  const normalizedCurrency = CURRENCY_BY_LABEL[settings?.currency] ? settings.currency : defaultSettings.currency;

  return {
    ...defaultSettings,
    ...settings,
    language: normalizedLanguage,
    currency: normalizedCurrency,
    notifications: {
      ...defaultSettings.notifications,
      ...settings?.notifications,
    },
  };
}

export function SettingsProvider({ children }) {
  const [rawSettings, setSettings] = useLocalStorage("traveloop_settings", defaultSettings);
  const settings = useMemo(() => normalizeSettings(rawSettings), [rawSettings]);

  const updateSetting = useCallback(
    (key, value) => setSettings(prev => ({ ...prev, [key]: value })),
    [setSettings]
  );

  const updateNotification = useCallback(
    (key, value) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, [key]: value } })),
    [setSettings]
  );

  const resetSettings = useCallback(() => setSettings(defaultSettings), [setSettings]);

  const languageMeta = LANGUAGE_META[settings.language] || LANGUAGE_META.English;
  const currencyMeta = CURRENCY_BY_LABEL[settings.currency] || CURRENCY_BY_LABEL[defaultSettings.currency];
  const lang = settings.language;
  const locale = currencyMeta.locale || languageMeta.locale;
  const currencyCode = currencyMeta.code;
  const exchangeRates = useMemo(
    () => Object.fromEntries(CURRENCY_OPTIONS.map((option) => [option.code, option.rate])),
    []
  );

  const t = useCallback(
    (key, fallback = key) => translations[lang]?.[key] ?? translations.English?.[key] ?? fallback,
    [lang]
  );

  const formatNumber = useCallback(
    (value, options = {}) => {
      try {
        return new Intl.NumberFormat(locale, options).format(Number(value) || 0);
      } catch {
        return `${Number(value) || 0}`;
      }
    },
    [locale]
  );

  const convertCurrency = useCallback(
    (amount, sourceCurrency = "USD") => {
      const numericAmount = Number(amount) || 0;
      const sourceRate = exchangeRates[sourceCurrency] || 1;
      const targetRate = exchangeRates[currencyCode] || 1;
      return (numericAmount / sourceRate) * targetRate;
    },
    [currencyCode, exchangeRates]
  );

  const formatCurrency = useCallback(
    (amount, options = {}) => {
      try {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currencyCode,
          maximumFractionDigits: options.maximumFractionDigits ?? 0,
          minimumFractionDigits: options.minimumFractionDigits ?? 0,
        }).format(amount);
      } catch {
        return `${currencyCode} ${amount}`;
      }
    },
    [currencyCode, locale]
  );

  const formatDate = useCallback(
    (value, options = {}) => {
      if (!value) return "";
      try {
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
          ...options,
        }).format(new Date(value));
      } catch {
        return String(value);
      }
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      settings,
      lang,
      locale,
      currencyCode,
      languageOptions: Object.keys(LANGUAGE_META),
      currencyOptions: CURRENCY_OPTIONS,
      updateSetting,
      updateNotification,
      resetSettings,
      t,
      formatNumber,
      formatCurrency,
      convertCurrency,
      formatDate,
    }),
    [
      settings,
      lang,
      locale,
      currencyCode,
      updateSetting,
      updateNotification,
      resetSettings,
      t,
      formatNumber,
      formatCurrency,
      convertCurrency,
      formatDate,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettingsContext must be inside SettingsProvider");
  return ctx;
}
