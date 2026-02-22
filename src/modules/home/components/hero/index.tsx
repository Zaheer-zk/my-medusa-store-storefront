import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="content-container pt-8 small:pt-12">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-ink-light bg-brand-ink-dark/80 backdrop-blur-xl px-6 py-12 text-brand-cream shadow-[0_35px_90px_-45px_rgba(16,26,47,0.95)] small:p-14">
        <div className="absolute -left-20 top-4 h-52 w-52 rounded-full bg-brand-clay/30 blur-[70px] animate-blob" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8ca6d3]/25 blur-[75px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 grid gap-10 medium:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-float-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-beige">
              New Arrivals
            </p>
            <h1 className="text-balance font-display text-5xl leading-[1.05] text-brand-gold-light small:text-6xl">
              Discover our latest premium collection.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-beige">
              Shop the newest trends and exclusive pieces curated just for you. Find everything you need to upgrade your lifestyle and elevate your everyday.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LocalizedClientLink
                href="/store"
                className="rounded-full border border-brand-beige bg-brand-gold-light px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-ink transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(248,230,197,0.2)]"
              >
                Explore catalog
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                className="rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold-light transition-all duration-300 hover:border-brand-gold-light hover:scale-105 hover:bg-white/5"
              >
                Your account
              </LocalizedClientLink>
            </div>
          </div>
          <div className="grid gap-4 self-end small:grid-cols-2 medium:grid-cols-1">
            <div className="group rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold-light/50 hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige transition-colors group-hover:text-white">
                Member Exclusive
              </p>
              <p className="mt-2 font-display text-3xl text-brand-gold-light transition-transform duration-300 group-hover:translate-x-1">
                Free Shipping
              </p>
            </div>
            <div className="group rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold-light/50 hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige transition-colors group-hover:text-white">
                Hassle-Free
              </p>
              <p className="mt-2 font-display text-3xl text-brand-gold-light transition-transform duration-300 group-hover:translate-x-1">
                30-Day Returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
