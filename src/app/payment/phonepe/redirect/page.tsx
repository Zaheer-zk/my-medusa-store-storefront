export default function PhonePeRedirectPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Payment status received</h1>
      <p className="mt-3 text-ui-fg-subtle">
        You can now return to checkout and place the order.
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
