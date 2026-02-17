import React from "react"
import { CreditCard } from "@medusajs/icons"

/* India-only payment providers */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_paytm_paytm: {
    title: "Paytm",
    icon: <CreditCard />,
  },
  pp_phonepe_phonepe: {
    title: "PhonePe",
    icon: <CreditCard />,
  },
}

export const isRedirectPayment = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_paytm_") || providerId?.startsWith("pp_phonepe_")
  )
}

// Compatibility exports. Stripe/Manual are intentionally disabled for this India-only setup.
export const isStripeLike = () => false
export const isManual = () => false

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
