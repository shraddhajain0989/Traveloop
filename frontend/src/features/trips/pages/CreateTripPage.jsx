import { useCallback, useState, useEffect } from "react";
import { apiClient } from "@/shared/services/axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight, CalendarDays, Car, CheckCircle2, MapPin, UsersRound } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";
import { DateRangePicker } from "@/shared/components/ui/DateRangePicker";
import { DestinationInput } from "@/shared/components/ui/DestinationInput";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";
import { SmartItinerarySuggestions } from "../components/SmartItinerarySuggestions";

const STEPS = ["Basic Info", "Details", "Review"];

function StepProgress({ step }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {STEPS.map((label, i) => (
        <div className="flex items-center gap-3" key={label}>
          <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-sm font-black ${
            i < step ? "bg-emerald-500 text-white" :
            i === step ? "bg-gradient-to-r from-brand-500 to-accent-cyan text-white shadow-glow" :
            "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
          }`}>
            {i < step ? <CheckCircle2 size={16}/> : i + 1}
          </span>
          <span className={`text-sm ${i <= step ? "font-black text-ink dark:text-white" : "font-semibold text-slate-400 dark:text-slate-500"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { addTrip } = useTripContext();
  const { formatCurrency, t } = useSettingsContext();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // react-hook-form — prevents re-renders on every keystroke
  const { register, control, handleSubmit, getValues, trigger, watch, formState: { errors } } = useForm({
    defaultValues: {
      tripName: "",
      cities: [],
      startDate: "",
      endDate: "",
      budget: "",
      travelers: "1",
      transport: "Flights + private transfer",
    },
  });

  const watchedCities = watch("cities");
  const watchedName = watch("tripName");
  const watchedStart = watch("startDate");
  const watchedEnd = watch("endDate");
  const watchedBudget = watch("budget");
  const watchedTravelers = watch("travelers");
  const watchedTransport = watch("transport");

  // City hero image — fetched when first city is selected
  const [cityHeroImage, setCityHeroImage] = useState(null);
  const [cityHeroLoading, setCityHeroLoading] = useState(false);
  const primaryCity = watchedCities?.[0];

  useEffect(() => {
    if (!primaryCity) { setCityHeroImage(null); return; }
    setCityHeroLoading(true);
    apiClient.get(`/cities/image?city=${encodeURIComponent(primaryCity)}`)
      .then(res => {
        if (res.data?.success) setCityHeroImage(res.data.data.imageUrl);
      })
      .catch(() => {})
      .finally(() => setCityHeroLoading(false));
  }, [primaryCity]);

  const stepFields = [
    ["tripName", "cities"],
    ["startDate", "endDate", "budget", "travelers"],
  ];

  const handleNext = useCallback(async () => {
    if (step < 2) {
      const valid = await trigger(stepFields[step]);
      if (valid) setStep(s => s + 1);
    }
  }, [step, trigger]);

  const handlePrev = useCallback(() => setStep(s => Math.max(0, s - 1)), []);

  const handleSaveDraft = useCallback(async () => {
    const vals = getValues();
    try {
      await addTrip({
        title: vals.tripName || "Untitled Draft",
        cities: vals.cities,
        startDate: vals.startDate,
        endDate: vals.endDate,
        budget: Number(vals.budget) || 0,
        travelers: Number(vals.travelers) || 1,
        status: "Draft",
      });
      showToast({ type: "success", title: "Draft saved!", description: "Find it in My Trips." });
      navigate("/trips");
    } catch (error) {
      showToast({ title: "Unable to save draft", description: error.message });
    }
  }, [addTrip, getValues, navigate, showToast]);

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      await addTrip({
        title: data.tripName,
        cities: data.cities,
        startDate: data.startDate,
        endDate: data.endDate,
        budget: Number(data.budget),
        travelers: Number(data.travelers),
        transport: data.transport,
        status: "Planning",
      });
      showToast({ type: "success", title: "Trip created! ✈️", description: `"${data.tripName}" added to My Trips.` });
      navigate("/trips");
    } catch (error) {
      showToast({ title: "Unable to create trip", description: error.message });
    } finally {
      setLoading(false);
    }
  }, [addTrip, navigate, showToast]);

  const totalDays = watchedStart && watchedEnd
    ? Math.ceil((new Date(watchedEnd) - new Date(watchedStart)) / 86400000)
    : 0;

  const aiScores = [
    ["Route efficiency", Math.min(98, 60 + (watchedCities?.length || 0) * 12)],
    ["Budget confidence", Math.min(96, 40 + Math.round((Number(watchedBudget) || 0) / 150))],
    ["Activity balance", Math.min(94, 50 + totalDays * 3)],
  ];

  return (
    <div className="mt-6 space-y-6">
      <PageHeader eyebrow="Trip wizard" title="Create Intelligent Trip" description="Multi-step trip builder with smart validation and AI scoring." />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
          <StepProgress step={step} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-8 min-h-[360px]">

              {/* ── Step 0: Basic Info ── */}
              <div className={step === 0 ? "block" : "hidden"}>
                <div className="grid gap-5">
                  <Input
                    id="trip-name"
                    label="Trip Name"
                    placeholder="Bali workation loop"
                    error={errors.tripName?.message}
                    {...register("tripName", { required: "Trip name is required" })}
                  />
                  <Controller
                    name="cities"
                    control={control}
                    rules={{ validate: v => (v && v.length > 0) || "Add at least one destination" }}
                    render={({ field }) => (
                      <DestinationInput
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.cities?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* ── Step 1: Details ── */}
              <div className={step === 1 ? "block" : "hidden"}>
                <div className="grid gap-5">
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: "Start date is required" }}
                    render={({ field: sf }) => (
                      <Controller
                        name="endDate"
                        control={control}
                        rules={{
                          required: "End date is required",
                          validate: v => !watchedStart || v > watchedStart || "End must be after start",
                        }}
                        render={({ field: ef }) => (
                          <DateRangePicker
                            startDate={sf.value}
                            endDate={ef.value}
                            onStartChange={sf.onChange}
                            onEndChange={ef.onChange}
                            startError={errors.startDate?.message}
                            endError={errors.endDate?.message}
                          />
                        )}
                      />
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      id="budget"
                      label={`${t("budget")}`}
                      type="number"
                      placeholder="8420"
                      error={errors.budget?.message}
                      {...register("budget", { required: "Budget is required", min: { value: 1, message: "Must be > 0" } })}
                    />
                    <Input
                      id="travelers"
                      label="Travelers"
                      type="number"
                      placeholder="4"
                      error={errors.travelers?.message}
                      {...register("travelers", { required: "Required", min: { value: 1, message: "Min 1" } })}
                    />
                  </div>
                  <Controller
                    name="transport"
                    control={control}
                    render={({ field }) => (
                      <Select id="transport" label="Transportation" {...field}>
                        <option>Flights + private transfer</option>
                        <option>Rail-first</option>
                        <option>Self-drive</option>
                        <option>Budget buses + trains</option>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* ── Step 2: Review ── */}
              <div className={step === 2 ? "block" : "hidden"}>
                <div className="grid gap-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Review your trip before creating.</p>
                  {[
                    [CalendarDays, `${totalDays > 0 ? totalDays : "—"} travel days`, `${watchedStart || "—"} → ${watchedEnd || "—"}`],
                    [UsersRound, `${watchedTravelers || 1} traveler${Number(watchedTravelers) !== 1 ? "s" : ""}`, "Shared collaboration ready"],
                    [Car, watchedTransport || "—", "Transport preference"],
                    [MapPin, watchedCities?.join(", ") || "No destinations", `${watchedCities?.length || 0} city stops`],
                  ].map(([Icon, title, copy]) => (
                    <div key={title} className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-700">
                      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm dark:bg-slate-600 dark:text-brand-400"><Icon size={20}/></span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-black text-ink dark:text-white">{title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{copy}</p>
                      </div>
                      <CheckCircle2 className="flex-shrink-0 text-emerald-500" size={20}/>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-900/20">
                    <span className="font-bold text-brand-700 dark:text-brand-400">Total Budget</span>
                    <span className="text-2xl font-black text-brand-600 dark:text-brand-300">{formatCurrency(Number(watchedBudget || 0))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Button type="button" variant="ghost" onClick={() => navigate("/trips")}>Cancel</Button>
              <div className="flex gap-3">
                <Button type="button" disabled={step === 0} onClick={handlePrev} variant="secondary">
                  <ArrowLeft size={16}/> Previous
                </Button>
                <Button type="button" variant="secondary" onClick={handleSaveDraft}>Save Draft</Button>
                {step < 2 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue <ArrowRight size={16}/>
                  </Button>
                ) : (
                  <Button type="submit" isLoading={loading}>
                    Create Trip <ArrowRight size={16}/>
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* AI sidebar */}
        <Card className="overflow-hidden p-0 dark:bg-slate-800 dark:border-slate-700">

          {/* ── City Hero Image ── */}
          <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
            {primaryCity ? (
              <>
                {cityHeroLoading ? (
                  <div className="h-full w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
                ) : cityHeroImage ? (
                  <img
                    key={cityHeroImage}
                    src={cityHeroImage}
                    alt={primaryCity}
                    className="h-full w-full object-cover transition-all duration-700"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Destination</p>
                  <h3 className="text-2xl font-black leading-tight">{primaryCity}</h3>
                  {watchedCities.length > 1 && (
                    <p className="text-xs text-white/70 mt-0.5">+{watchedCities.length - 1} more stop{watchedCities.length > 2 ? "s" : ""}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400 dark:text-slate-600">
                <MapPin size={32} strokeWidth={1.2} />
                <p className="text-sm font-medium">Select a city to see it come alive</p>
              </div>
            )}
          </div>

          <div className="p-6">
            <h2 className="text-lg font-black text-ink dark:text-white">AI trip intelligence</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Live scoring updates as you fill in details.</p>
            <div className="mt-5 space-y-4">
              {aiScores.map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                    <span>{label}</span><span>{pct}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan transition-all duration-700" style={{width:`${pct}%`}}/>
                  </div>
                </div>
              ))}
            </div>

            {watchedName && (
              <div className="mt-5 rounded-2xl bg-brand-50 p-4 dark:bg-brand-900/20">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Trip Preview</p>
                <p className="mt-2 font-black text-ink dark:text-white">{watchedName}</p>
                {watchedCities?.length > 0 && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{watchedCities.join(" → ")}</p>
                )}
              </div>
            )}

            {watchedCities?.length > 0 && totalDays > 0 && (
              <div className="mt-6">
                <SmartItinerarySuggestions
                  city={watchedCities[0]}
                  days={totalDays}
                  travelType="budget"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
