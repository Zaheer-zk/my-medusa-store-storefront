import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <div className="border-b border-white/10 bg-brand-ink text-[11px] tracking-[0.18em] text-white/80 uppercase">
        <div className="content-container py-2 text-center">
          Curated marketplace experiences
        </div>
      </div>
      <header className="border-b border-brand-border bg-brand-paper/90 backdrop-blur-md">
        <nav className="content-container flex h-20 items-center justify-between gap-4 text-sm text-brand-ink-light">
          <div className="flex flex-1 basis-0 items-center gap-6">
            <div className="h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink
              href="/store"
              className="hidden small:inline-flex rounded-full border border-brand-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink transition hover:border-brand-gold hover:text-brand-ink"
            >
              Shop
            </LocalizedClientLink>
          </div>

          <div className="flex items-center justify-center">
            <LocalizedClientLink
              href="/"
              className="font-display text-[1.7rem] leading-none tracking-[0.06em] text-brand-ink transition hover:text-brand-gold"
              data-testid="nav-store-link"
            >
              Atelier Bazaar
            </LocalizedClientLink>
          </div>

          <div className="flex flex-1 basis-0 items-center justify-end gap-4 small:gap-6">
            <div className="hidden small:flex items-center gap-5">
              <LocalizedClientLink
                className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted transition hover:text-brand-ink"
                href="/store"
              >
                Catalog
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted transition hover:text-brand-ink"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="rounded-full border border-brand-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-ink transition hover:border-brand-gold"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart 0
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
