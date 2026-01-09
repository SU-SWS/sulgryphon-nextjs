import HeaderGradientLine from "@/components/patterns/header-gradient-line"

type Props = {
  heading: string
  headerTag?: "h2" | "h3" | "h4"
}

const SectionHeading = ({heading, headerTag = "h2"}: Props) => (
  <div className="centered mb-40 flex w-full flex-row items-center justify-between gap-16">
    {headerTag === "h2" && <h2 className="mb-0 md:shrink-0">{heading}</h2>}
    {headerTag === "h3" && <h3 className="mb-0 md:shrink-0">{heading}</h3>}
    {headerTag === "h4" && <h4 className="mb-0 md:shrink-0">{heading}</h4>}
    <HeaderGradientLine />
  </div>
)

export default SectionHeading
