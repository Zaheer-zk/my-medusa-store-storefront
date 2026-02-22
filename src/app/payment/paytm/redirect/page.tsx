export default function PaytmRedirectPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Paytm payment response received</h1>
      <p className="mt-3 text-ui-fg-subtle">
        Return to checkout and place the order after the payment status is confirmed.
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center rounded-md border border-ui-border-base px-4 py-2 text-ui-fg-base"
        >
          Go back to storefront
        </a>
      </div>
    </div>
  )
}
