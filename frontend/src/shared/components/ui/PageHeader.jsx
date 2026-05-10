import { motion } from "framer-motion";
import { Button } from "./Button";

export function PageHeader({ eyebrow, title, description, actionLabel, onAction }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.28 }}
    >
      <div>
        {eyebrow && (
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>}
      </div>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </motion.section>
  );
}
