import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function toStr(y, m, d) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function formatDisplay(s) {
  if (!s) return "";
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}
function todayStr() {
  const d = new Date();
  return toStr(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DateRangePicker({ startDate, endDate, onStartChange, onEndChange, startError, endError }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState("start");
  const [hover, setHover] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const prevMonth = () => viewMonth === 0 ? (setViewYear(y=>y-1), setViewMonth(11)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth === 11 ? (setViewYear(y=>y+1), setViewMonth(0)) : setViewMonth(m=>m+1);

  const days = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const td = todayStr();

  const handleDay = (day) => {
    const ds = toStr(viewYear, viewMonth, day);
    if (selecting === "start") {
      onStartChange(ds);
      if (endDate && ds >= endDate) onEndChange("");
      setSelecting("end");
    } else {
      if (startDate && ds <= startDate) {
        onEndChange(startDate); onStartChange(ds);
      } else {
        onEndChange(ds); setOpen(false); setSelecting("start");
      }
    }
  };

  const inRange = (day) => {
    const ds = toStr(viewYear, viewMonth, day);
    const end = selecting === "end" && hover ? hover : endDate;
    return !!(startDate && end && ds > startDate && ds < end);
  };

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-2 gap-3">
        {[["start","Start Date",startDate,startError],["end","End Date",endDate,endError]].map(([sel,lbl,val,err])=>(
          <div key={sel}>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">{lbl}</label>
            <button
              type="button"
              onClick={() => { setSelecting(sel); setOpen(true); }}
              className={cn(
                "flex w-full items-center gap-2 rounded-2xl border bg-white/90 px-4 py-3 text-sm text-left transition focus:outline-none focus:ring-4 dark:bg-slate-700",
                err ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-brand-500 focus:ring-brand-100 dark:border-slate-600",
                open && selecting === sel && "border-brand-500 ring-4 ring-brand-100"
              )}
            >
              <Calendar size={15} className="flex-shrink-0 text-slate-400" />
              <span className={val ? "text-slate-800 dark:text-white" : "text-slate-400"}>
                {val ? formatDisplay(val) : `Select ${lbl.toLowerCase()}`}
              </span>
            </button>
            {err && <p className="mt-1 text-xs font-medium text-red-500">{err}</p>}
          </div>
        ))}
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-premium backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" aria-label="Previous month" onClick={prevMonth} className="grid h-8 w-8 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <ChevronLeft size={16}/>
            </button>
            <span className="text-sm font-extrabold text-ink dark:text-white">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" aria-label="Next month" onClick={nextMonth} className="grid h-8 w-8 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <ChevronRight size={16}/>
            </button>
          </div>

          <div className="mb-2 flex gap-2">
            {["start","end"].map(s=>(
              <span key={s} className={cn("rounded-full px-3 py-0.5 text-xs font-bold transition", selecting===s?"bg-brand-500 text-white":"bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400")}>
                {s==="start"?"Start":"End"}
              </span>
            ))}
          </div>

          <div className="mb-1 grid grid-cols-7">
            {DAYS.map(d=><div key={d} className="py-1 text-center text-xs font-bold text-slate-400">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:days},(_,i)=>i+1).map(day=>{
              const ds = toStr(viewYear,viewMonth,day);
              const isStart = ds===startDate, isEnd = ds===endDate;
              const past = ds < td;
              return (
                <div key={day} className={cn(inRange(day)&&"bg-brand-50 dark:bg-brand-900/20")}>
                  <button
                    type="button"
                    disabled={past}
                    onClick={()=>handleDay(day)}
                    onMouseEnter={()=>selecting==="end"&&setHover(ds)}
                    onMouseLeave={()=>setHover(null)}
                    className={cn(
                      "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition",
                      isStart||isEnd?"bg-brand-500 text-white shadow-glow":
                      ds===td?"font-black text-brand-600 ring-2 ring-brand-200":
                      past?"cursor-not-allowed text-slate-300 dark:text-slate-600":
                      "text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-brand-900/30"
                    )}
                  >{day}</button>
                </div>
              );
            })}
          </div>

          {startDate && endDate && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
              <span className="text-xs text-slate-500">{Math.ceil((new Date(endDate)-new Date(startDate))/86400000)} nights</span>
              <button type="button" onClick={()=>{onStartChange("");onEndChange("");setSelecting("start");}} className="text-xs font-semibold text-red-500 hover:text-red-600">Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
