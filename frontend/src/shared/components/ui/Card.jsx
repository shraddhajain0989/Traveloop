import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

const motionComponentCache = new Map();

function getMotionComponent(Component) {
  if (typeof Component === "string") {
    return motion[Component] || motion.div;
  }

  if (!motionComponentCache.has(Component)) {
    motionComponentCache.set(Component, motion(Component));
  }

  return motionComponentCache.get(Component);
}

export function Card({ children, className, as: Component = "div", interactive = false }) {
  const MotionComponent = getMotionComponent(Component);
  return (
    <MotionComponent
      whileHover={interactive ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-3xl border border-white/70 bg-white/90 text-slate-900 shadow-soft backdrop-blur-xl transition dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100",
        className
      )}
    >
      {children}
    </MotionComponent>
  );
}
