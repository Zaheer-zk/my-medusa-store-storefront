import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="rounded-[1.4rem] border border-brand-border bg-brand-paper p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold-light hover:shadow-[0_20px_40px_-15px_rgba(26,34,56,0.08)]"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-faded">
              {isFeatured ? "Featured" : "Collection"}
            </p>
            <Text
              className="mt-1 text-sm font-semibold leading-6 text-brand-ink"
              data-testid="product-title"
            >
              {product.title}
            </Text>
          </div>
          <div className="flex items-center gap-x-2 rounded-full border border-brand-border bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-ink">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
