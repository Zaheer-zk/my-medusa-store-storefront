import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  query,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  query?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const trimmedQuery = query?.trim() || ""
  const isSearchResults = Boolean(trimmedQuery)

  return (
    <div
      className="content-container flex flex-col gap-6 py-8 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="section-shell mb-8 p-6 small:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61739b]">
            {isSearchResults ? "Search results" : "Storefront"}
          </p>
          <h1
            className="mt-2 font-display text-4xl text-[#1a2238] small:text-5xl"
            data-testid="store-page-title"
          >
            {isSearchResults ? `Results for "${trimmedQuery}"` : "All products"}
          </h1>
          {isSearchResults && (
            <p className="mt-3 text-sm leading-7 text-[#4f6088]">
              Showing products matching your query. Update filters or search
              with a different keyword for broader results.
            </p>
          )}
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            searchQuery={trimmedQuery}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
