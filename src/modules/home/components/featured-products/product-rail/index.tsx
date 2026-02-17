import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <section className="content-container">
      <div className="section-shell grain-overlay overflow-hidden p-6 small:p-10">
        <div className="mb-8 flex flex-col gap-4 small:mb-10 small:flex-row small:items-end small:justify-between">
          <div>
            <Text className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6d7fa7]">
              Curated selection
            </Text>
            <Text className="font-display text-3xl text-[#1a2238] small:text-4xl">
              {collection.title}
            </Text>
          </div>
          <InteractiveLink href={`/collections/${collection.handle}`}>
            View all
          </InteractiveLink>
        </div>
        <ul className="grid grid-cols-2 gap-5 small:grid-cols-3 small:gap-6 medium:grid-cols-4">
          {pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
