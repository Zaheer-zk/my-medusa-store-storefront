"use client"

import { isRedirectPayment } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession =
    cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === "pending"
    ) || cart.payment_collection?.payment_sessions?.[0]

  if (isRedirectPayment(paymentSession?.provider_id)) {
    return (
      <RedirectPaymentButton
        cart={cart}
        notReady={notReady}
        data-testid={dataTestId}
      />
    )
  }

  return <Button disabled>Select Paytm or PhonePe to continue</Button>
}

const RedirectPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const paymentSession =
    cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === "pending"
    ) || cart.payment_collection?.payment_sessions?.[0]
  const providerId = paymentSession?.provider_id
  const providerLabel = providerId?.includes("paytm")
    ? "Paytm"
    : providerId?.includes("phonepe")
      ? "PhonePe"
      : "selected provider"
  const checkoutUrl =
    (paymentSession?.data as Record<string, unknown> | undefined)
      ?.redirect_url ||
    (paymentSession?.data as Record<string, unknown> | undefined)?.checkout_url

  const handleGatewayRedirect = () => {
    if (!checkoutUrl || typeof checkoutUrl !== "string") {
      setErrorMessage(
        `No redirect URL found for ${providerLabel}. Re-select the payment method and try again.`
      )
      return
    }

    window.location.href = checkoutUrl
  }

  const handlePlaceOrder = async () => {
    setSubmitting(true)
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          disabled={notReady}
          onClick={handleGatewayRedirect}
          size="large"
          data-testid="redirect-payment-button"
        >
          Pay with {providerLabel}
        </Button>
        <Button
          type="button"
          disabled={notReady}
          isLoading={submitting}
          onClick={handlePlaceOrder}
          size="large"
          data-testid={dataTestId}
        >
          Place order after payment
        </Button>
      </div>
      <ErrorMessage error={errorMessage} data-testid="redirect-payment-error" />
    </>
  )
}

export default PaymentButton
