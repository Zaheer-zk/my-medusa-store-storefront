import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-[#fdf9f1] small:min-h-screen">
      <div className="h-20 border-b border-[#e8ddc9] bg-[#fffdf8]/90 backdrop-blur-md">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#495980]"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block transition hover:text-[#1a2238]">
              Back to shopping cart
            </span>
            <span className="mt-px block transition hover:text-[#1a2238] small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-[1.8rem] tracking-[0.05em] text-[#1a2238] transition hover:text-[#b9833f]"
            data-testid="store-link"
          >
            Atelier Bazaar
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex w-full items-center justify-center py-4 text-[#55678f]">
        <MedusaCTA />
      </div>
    </div>
  )
}
