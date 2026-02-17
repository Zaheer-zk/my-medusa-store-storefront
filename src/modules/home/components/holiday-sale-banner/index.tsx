import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HolidaySaleBanner = () => {
  return (
    <section className="content-container mt-8 small:mt-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#2f3e62] bg-[#1a2238] px-6 py-8 text-[#f8e6c5] shadow-[0_25px_70px_-40px_rgba(26,34,56,0.95)] small:px-9 small:py-10">
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#c76a46]/35 blur-[55px]" />
        <div className="absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[#b9833f]/30 blur-[65px]" />
        <div className="relative z-10 grid gap-6 medium:grid-cols-[1.15fr_0.85fr] medium:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e6cfaa]">
              Holiday Sale
            </p>
            <h2 className="mt-2 font-display text-4xl leading-tight small:text-5xl">
              Festive markdowns are live. Save up to 40%.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e7d3b4]">
              Limited-time pricing on selected multi-vendor collections. Offer
              applies at checkout with Paytm and PhonePe.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 medium:justify-end">
            <LocalizedClientLink
              href="/store?sortBy=price_asc"
              className="inline-flex items-center rounded-full border border-[#f2dfbe] bg-[#f8e6c5] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#1a2238] transition hover:bg-white"
            >
              Shop sale
            </LocalizedClientLink>
            <span className="rounded-full border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f8e6c5]">
              Code: HOLIDAYINR
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HolidaySaleBanner
