import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full mt-24 border-t border-brand-beige bg-brand-ink-dark text-brand-cream">
      <div className="content-container py-16 small:py-20">
        <div className="grid gap-12 small:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <LocalizedClientLink
              href="/"
              className="font-display text-[2.1rem] leading-none tracking-[0.04em] text-brand-gold-light transition hover:text-white"
            >
              Atelier Bazaar
            </LocalizedClientLink>
            <Text className="max-w-md text-sm leading-7 text-brand-beige">
              A modern-classic commerce experience crafted for premium multi
              vendor stories.
            </Text>
            <div className="inline-flex rounded-full border border-brand-gold/60 bg-brand-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light">
              Worldwide shipping available
            </div>
          </div>
          <div className="grid gap-10 text-sm sm:grid-cols-3">
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories.slice(0, 6).map((category) => {
                    if (category.parent_category) {
                      return null
                    }

                    return (
                      <li key={category.id}>
                        <LocalizedClientLink
                          className="text-brand-beige transition hover:text-white"
                          href={`/categories/${category.handle}`}
                          data-testid="category-link"
                        >
                          {category.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-brand-beige", {
                    "sm:grid-cols-2": collections.length > 3,
                  })}
                >
                  {collections.slice(0, 6).map((collection) => (
                    <li key={collection.id}>
                      <LocalizedClientLink
                        className="transition hover:text-white"
                        href={`/collections/${collection.handle}`}
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light">
                Platform
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-brand-beige">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition hover:text-white"
                  >
                    Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-brand-beige small:flex-row small:items-center small:justify-between">
          <Text className="tracking-[0.08em] uppercase">
            © {new Date().getFullYear()} Atelier Bazaar
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
