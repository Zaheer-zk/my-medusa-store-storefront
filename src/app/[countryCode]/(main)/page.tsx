import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Atelier Bazaar | Modern Classic Marketplace",
  description: "A refined storefront experience for curated multi-vendor commerce.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <div className="pb-16 small:pb-24">
      <Hero />
      <section className="content-container mt-8 small:mt-12">
        <div className="section-shell p-6 small:p-8">
          <div className="flex flex-col gap-4 small:flex-row small:items-end small:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f7199]">
                Signature collections
              </p>
              <h2 className="mt-2 font-display text-4xl text-[#1a2238]">
                Explore the latest edit
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#4f6088]">
              Handpicked products organized for fast browsing, rich visuals, and
              modern conversion-focused shopping.
            </p>
          </div>
        </div>
      </section>
      <div className="mt-8">
        <FeaturedProducts collections={collections} region={region} />
      </div>
    </div>
  )
}
