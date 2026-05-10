import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="grid min-h-screen overflow-hidden bg-[#f7f8fb] lg:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <Outlet />
      </section>
      <section className="relative hidden overflow-hidden rounded-l-[2rem] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1500&q=85')] bg-cover bg-center lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/80 via-accent-cyan/70 to-brand-500/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-cyan-300/20" />
        <div className="relative flex h-full items-center justify-center px-16 text-center text-white">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Plan Your Next Adventure
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Create beautiful multi-city itineraries, discover amazing destinations, and share your travel experiences with friends.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
