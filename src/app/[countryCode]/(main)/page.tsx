import { Metadata } from "next"

import { listProducts, listProductsWithSort } from "@lib/data/products"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HolidaySaleBanner from "@modules/home/components/holiday-sale-banner"
import ProductShowcase from "@modules/home/components/product-showcase"
import SearchHub from "@modules/home/components/search-hub"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Atelier Bazaar | Modern Classic Marketplace",
  description: "A refined storefront experience for curated multi-vendor commerce.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const [region, collectionsResponse, latestProductsResponse, productPoolResponse] =
    await Promise.all([
      getRegion(countryCode),
      listCollections({
        fields: "id, handle, title",
      }),
      listProductsWithSort({
        countryCode,
        sortBy: "created_at",
        page: 1,
        queryParams: {
          limit: 8,
        },
      }),
      listProducts({
        countryCode,
        queryParams: {
          limit: 100,
        },
      }),
    ])

  if (!region) {
    return null
  }

  const collections = collectionsResponse.collections || []
  const latestProducts = latestProductsResponse.response.products || []
  const mostSellingProducts = selectMostSellingProducts(
    productPoolResponse.response.products || [],
    latestProducts,
    8
  )

  return (
    <div className="pb-16 small:pb-24">
      <SearchHub countryCode={countryCode} />
      <Hero />
      <HolidaySaleBanner />
      <ProductShowcase
        eyebrow="Latest products"
        title="Fresh arrivals"
        description="Recently added products across vendors, optimized for quick discovery and conversion."
        products={latestProducts}
        region={region}
        viewAllHref="/store?sortBy=created_at"
      />
      <ProductShowcase
        eyebrow="Most selling now"
        title="Top movers"
        description="High-performing products selected from current catalog activity and merchandising signals."
        products={mostSellingProducts}
        region={region}
        viewAllHref="/store"
      />
      {collections.length > 0 && (
        <section className="mt-8 small:mt-10">
          <FeaturedProducts collections={collections} region={region} />
        </section>
      )}
    </div>
  )
}

const bestSellerKeywords = /(best|bestseller|top|popular|trending|most\s*selling|hot)/i

const toNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

const hasTruthyFlag = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key]
  return value === true || value === "true" || value === 1 || value === "1"
}

const productScore = (product: HttpTypes.StoreProduct) => {
  const metadata = (product.metadata || {}) as Record<string, unknown>
  const tagsText = (product.tags || [])
    .map((tag) => tag.value || "")
    .join(" ")

  const explicitSalesCount =
    toNumber(metadata.sales_count) +
    toNumber(metadata.sold_count) +
    toNumber(metadata.total_sold) +
    toNumber(metadata.orders_count) +
    toNumber(metadata.order_count)

  const bestsellerSignals =
    (bestSellerKeywords.test(tagsText) ? 40 : 0) +
    (hasTruthyFlag(metadata, "is_best_seller") ? 40 : 0) +
    (hasTruthyFlag(metadata, "is_most_selling") ? 30 : 0)

  const createdAtSignal = product.created_at
    ? new Date(product.created_at).getTime() / 1_000_000_000_000
    : 0

  return explicitSalesCount + bestsellerSignals + createdAtSignal
}

const selectMostSellingProducts = (
  productPool: HttpTypes.StoreProduct[],
  latestProducts: HttpTypes.StoreProduct[],
  limit: number
) => {
  const latestIds = new Set(latestProducts.map((product) => product.id))

  const ranked = [...productPool].sort((a, b) => productScore(b) - productScore(a))
  const withoutLatest = ranked.filter((product) => !latestIds.has(product.id))

  const selected = withoutLatest.slice(0, limit)

  if (selected.length >= limit) {
    return selected
  }

  const missing = limit - selected.length
  const fallback = ranked
    .filter(
      (product) => !selected.some((selectedProduct) => selectedProduct.id === product.id)
    )
    .slice(0, missing)

  return [...selected, ...fallback]
}
