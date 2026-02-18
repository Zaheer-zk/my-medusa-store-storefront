import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

type ProductShowcaseProps = {
  eyebrow: string
  title: string
  description: string
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  viewAllHref: string
}

const ProductShowcase = ({
  eyebrow,
  title,
  description,
  products,
  region,
  viewAllHref,
}: ProductShowcaseProps) => {
  if (!products.length) {
    return null
  }

  return (
    <section className="content-container mt-8 small:mt-10">
      <div className="section-shell grain-overlay overflow-hidden p-6 small:p-8">
        <div className="mb-6 flex flex-col gap-3 small:mb-8 small:flex-row small:items-end small:justify-between">
          <div>
            <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-faded">
              {eyebrow}
            </Text>
            <h2 className="mt-2 font-display text-4xl text-brand-ink small:text-5xl">
              {title}
            </h2>
          </div>
          <div className="small:max-w-lg">
            <p className="text-sm leading-7 text-brand-muted">{description}</p>
            <div className="mt-2">
              <InteractiveLink href={viewAllHref}>Browse more</InteractiveLink>
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-4 small:grid-cols-3 small:gap-5 medium:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductShowcase
