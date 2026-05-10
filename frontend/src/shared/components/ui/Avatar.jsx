export function Avatar({ name = "Traveler", src }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return src ? (
    <img alt={name} className="h-10 w-10 rounded-full object-cover" src={src} />
  ) : (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-700">
      {initials}
    </span>
  );
}

