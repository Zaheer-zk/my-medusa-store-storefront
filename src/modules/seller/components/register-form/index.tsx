"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  registerSeller,
  type SellerRegisterActionState,
} from "@lib/data/seller"

const initialState: SellerRegisterActionState = null

export default function SellerRegisterForm() {
  const [state, formAction] = useActionState(registerSeller, initialState)

  const isSuccess = state?.ok === true
  const isError = state?.ok === false

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-ui-border-base bg-white p-6 small:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register as a Seller
        </h1>
        <p className="mt-2 text-sm text-ui-fg-subtle">
          Create your seller account request. A super admin must approve your
          account before seller login and dashboard access are enabled.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 small:grid-cols-2">
          <Input
            label="First name"
            name="first_name"
            autoComplete="given-name"
            data-testid="seller-first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            autoComplete="family-name"
            data-testid="seller-last-name-input"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 small:grid-cols-2">
          <Input
            label="Seller name"
            name="seller_name"
            required
            data-testid="seller-name-input"
          />
          <Input
            label="Seller handle"
            name="seller_handle"
            required
            pattern="^[a-zA-Z0-9_-]+$"
            title="Use letters, numbers, underscore, or hyphen."
            data-testid="seller-handle-input"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 small:grid-cols-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="seller-email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="seller-phone-input"
          />
        </div>

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          data-testid="seller-password-input"
        />

        {isError ? (
          <ErrorMessage
            error={state?.message}
            data-testid="seller-register-error"
          />
        ) : null}

        {isSuccess ? (
          <div
            className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
            data-testid="seller-register-success"
          >
            {state?.message}
            {state?.seller_handle ? (
              <div className="mt-1 text-xs text-emerald-700">
                Seller handle: <code>{state.seller_handle}</code>
              </div>
            ) : null}
          </div>
        ) : null}

        <SubmitButton
          className="mt-2 w-full"
          data-testid="seller-register-submit-button"
        >
          Submit Seller Registration
        </SubmitButton>
      </form>

      <div className="mt-6 text-sm text-ui-fg-subtle">
        Already have a customer account?{" "}
        <LocalizedClientLink href="/account" className="underline">
          Go to account login
        </LocalizedClientLink>
      </div>
    </div>
  )
}
