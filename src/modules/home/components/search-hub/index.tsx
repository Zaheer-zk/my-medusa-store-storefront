import { MagnifyingGlass } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const quickFilters = [
  { label: "New arrivals", href: "/store?sortBy=created_at" },
  { label: "Tops", href: "/store?q=shirt" },
  { label: "Bottoms", href: "/store?q=pants" },
  { label: "Holiday gifts", href: "/store?q=gift" },
]

const SearchHub = ({ countryCode }: { countryCode: string }) => {
  return (
    <section className="content-container pt-6 small:pt-8">
      <div className="section-shell p-4 small:p-6">
        <form
          action={`/${countryCode}/store`}
          method="GET"
          className="flex flex-col gap-3 small:flex-row small:items-center"
        >
          <div className="relative flex-1">
            <MagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
            <input
              type="search"
              name="q"
              placeholder="Search products, categories, and seller picks"
              className="h-12 w-full rounded-full border border-brand-border bg-white pl-12 pr-4 text-sm text-brand-ink outline-none transition focus:border-brand-gold"
              aria-label="Search products"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-ink px-7 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold-light transition hover:bg-brand-ink-light"
          >
            Search
          </button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
            Quick filters
          </span>
          {quickFilters.map((item) => (
            <LocalizedClientLink
              key={item.label}
              href={item.href}
              className="rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-semibold text-brand-ink transition hover:border-brand-gold"
            >
              {item.label}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchHub
