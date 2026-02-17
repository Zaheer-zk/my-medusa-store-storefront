import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="group inline-flex items-center gap-x-2 rounded-full border border-[#d9c8ab] bg-[#fff9ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a2238] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9833f]"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-inherit">{children}</Text>
      <ArrowUpRightMini
        className="transition-transform duration-150 group-hover:rotate-45"
        color="currentColor"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
