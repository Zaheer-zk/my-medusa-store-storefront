import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="content-container pt-8 small:pt-12">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-ink-light bg-brand-ink-dark px-6 py-12 text-brand-cream shadow-[0_35px_90px_-45px_rgba(16,26,47,0.95)] small:p-14">
        <div className="absolute -left-20 top-4 h-52 w-52 rounded-full bg-brand-clay/30 blur-[70px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8ca6d3]/25 blur-[75px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 grid gap-10 medium:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-float-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-beige">
              Modern Classic Marketplace
            </p>
            <h1 className="text-balance font-display text-5xl leading-[1.05] text-brand-gold-light small:text-6xl">
              Crafted storefront for premium multi-vendor experiences.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-beige">
              Discover refined collections, clean product journeys, and a visual
              language built for trust and conversion.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LocalizedClientLink
                href="/store"
                className="rounded-full border border-brand-beige bg-brand-gold-light px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-ink transition hover:bg-white"
              >
                Explore catalog
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                className="rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold-light transition hover:border-brand-gold-light"
              >
                Your account
              </LocalizedClientLink>
            </div>
          </div>
          <div className="grid gap-4 self-end small:grid-cols-2 medium:grid-cols-1">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige">
                Design system
              </p>
              <p className="mt-2 font-display text-3xl text-brand-gold-light">
                Elegant + performant
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige">
                Checkout ready
              </p>
              <p className="mt-2 font-display text-3xl text-brand-gold-light">
                Paytm + PhonePe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
