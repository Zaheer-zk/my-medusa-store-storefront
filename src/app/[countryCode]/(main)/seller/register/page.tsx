import { Metadata } from "next"
import SellerRegisterForm from "@modules/seller/components/register-form"

export const metadata: Metadata = {
  title: "Seller Registration",
  description:
    "Apply for a seller account to list products on the marketplace.",
}

export default async function SellerRegisterPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  await props.params

  return (
    <div className="py-10 small:py-14">
      <div className="content-container">
        <SellerRegisterForm />
      </div>
    </div>
  )
}
