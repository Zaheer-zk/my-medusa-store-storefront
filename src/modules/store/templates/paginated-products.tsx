import { listProducts, listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { sortProducts } from "@lib/util/sort-products"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  searchQuery,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  searchQuery?: string
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (searchQuery) {
    queryParams["q"] = searchQuery
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let products: HttpTypes.StoreProduct[] = []
  let count = 0

  if (searchQuery) {
    const {
      response: { products: searchableProducts },
    } = await listProducts({
      pageParam: 1,
      queryParams: {
        ...queryParams,
        limit: 100,
      },
      countryCode,
    })

    const normalizedSearch = searchQuery.trim().toLowerCase()
    const filteredProducts = searchableProducts.filter((product) => {
      const searchValues = [
        product.title,
        product.subtitle,
        product.handle,
        product.description,
        ...(product.tags || []).map((tag) => tag.value || ""),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      return searchValues.includes(normalizedSearch)
    })

    const sortedProducts = sortProducts(filteredProducts, sortBy || "created_at")
    count = sortedProducts.length
    const offset = (page - 1) * PRODUCT_LIMIT
    products = sortedProducts.slice(offset, offset + PRODUCT_LIMIT)
  } else {
    const {
      response: { products: listedProducts, count: listedCount },
    } = await listProductsWithSort({
      page,
      queryParams,
      sortBy,
      countryCode,
    })

    products = listedProducts
    count = listedCount
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (!products.length) {
    return (
      <div className="section-shell p-6 text-sm leading-7 text-[#4f6088]">
        No products found for this view. Try another search or clear filters.
      </div>
    )
  }

  return (
    <>
      <ul
        className="grid w-full grid-cols-2 gap-4 small:grid-cols-3 small:gap-5 medium:grid-cols-4"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
