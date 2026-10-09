const TopRightSprinkles = () => {
  return (
    <div className="absolute top-0 right-0 h-[175px] max-h-full w-[325px] max-w-full lg:h-[350px] lg:w-[650px]">
      <div className="relative top-[-12px] h-full w-full bg-horizontal-card-sprinkles bg-cover bg-right-top bg-no-repeat lg:top-[-24px]" />
      <div className="absolute top-0 right-0 h-full w-full">
        <div className="absolute h-full w-full bg-linear-to-t/srgb from-black-true to-transparent" />
        <div className="absolute h-full w-full bg-linear-to-r/srgb from-black-true to-transparent" />
      </div>
    </div>
  )
}

const TopLeftSprinkles = () => {
  return (
    <div className="absolute top-0 left-0 h-[175px] max-h-full w-[325px] max-w-full lg:h-[350px] lg:w-[650px]">
      <div className="relative top-[-12px] h-full w-full scale-x-[-1] bg-horizontal-card-sprinkles bg-cover bg-right-top bg-no-repeat lg:top-[-24px]" />
      <div className="absolute top-0 right-0 h-full w-full">
        <div className="absolute h-full w-full bg-linear-to-t/srgb from-black-true to-transparent" />
        <div className="absolute h-full w-full bg-linear-to-l/srgb from-black-true to-transparent" />
      </div>
    </div>
  )
}

const BottomLeftSprinkles = () => {
  return (
    <div className="absolute bottom-0 left-0 h-[175px] max-h-full w-[325px] max-w-full lg:h-[350px] lg:w-[650px]">
      <div className="relative bottom-[-12px] h-full w-full scale-x-[-1] scale-y-[-1] bg-horizontal-card-sprinkles bg-cover bg-right-top bg-no-repeat lg:bottom-[-24px]" />
      <div className="absolute top-0 right-0 h-full w-full">
        <div className="absolute h-full w-full bg-linear-to-b/srgb from-black-true to-transparent" />
        <div className="absolute h-full w-full bg-linear-to-l/srgb from-black-true to-transparent" />
      </div>
    </div>
  )
}

const BottomRightSprinkles = () => {
  return (
    <div className="absolute right-0 bottom-0 h-[175px] max-h-full w-[325px] max-w-full lg:h-[350px] lg:w-[650px]">
      <div className="relative bottom-[-12px] h-full w-full scale-y-[-1] bg-horizontal-card-sprinkles bg-cover bg-right-top bg-no-repeat lg:bottom-[-24px]" />
      <div className="absolute top-0 right-0 h-full w-full">
        <div className="absolute h-full w-full bg-linear-to-b/srgb from-black-true to-transparent" />
        <div className="absolute h-full w-full bg-linear-to-r/srgb from-black-true to-transparent" />
      </div>
    </div>
  )
}

const CardSprinkles = ({position}: {position: "top_right" | "top_left" | "bottom_right" | "bottom_left"}) => {
  return (
    <>
      {position === "top_right" && <TopRightSprinkles />}
      {position === "top_left" && <TopLeftSprinkles />}
      {position === "bottom_right" && <BottomRightSprinkles />}
      {position === "bottom_left" && <BottomLeftSprinkles />}
    </>
  )
}

export default CardSprinkles
