const TopRightSprinkles = () => {
  return (
    <div className="su-max-h-full su-absolute su-w-[325px] su-max-w-full lg:su-w-[650px] su-h-[175px] lg:su-h-[350px] su-top-0 su-right-0">
      <div className="su-relative su-w-full su-h-full su-top-[-12px] lg:su-top-[-24px] su-bg-no-repeat su-bg-horizontal-card-sprinkles su-bg-right-top su-bg-cover"/>
      <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
        <div className="su-w-full su-h-full su-bg-gradient-to-t su-from-black-true su-to-transparent su-absolute"/>
        <div className="su-w-full su-h-full su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute"/>
      </div>
    </div>
  )
}

const TopLeftSprinkles = () => {
  return (
    <div className="su-max-h-full su-absolute su-w-[325px] su-max-w-full lg:su-w-[650px] su-h-[175px] lg:su-h-[350px] su-top-0 su-left-0">
      <div className="su-relative su-w-full su-h-full su-top-[-12px] lg:su-top-[-24px] su-bg-no-repeat su-bg-horizontal-card-sprinkles su-bg-right-top su-bg-cover su-scale-x-[-1]"/>
      <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
        <div className="su-w-full su-h-full su-bg-gradient-to-t su-from-black-true su-to-transparent su-absolute"/>
        <div className="su-w-full su-h-full su-bg-gradient-to-l su-from-black-true su-to-transparent su-absolute"/>
      </div>
    </div>
  )
}

const BottomLeftSprinkles = () => {
  return (
    <div className="su-max-h-full su-absolute su-w-[325px] su-max-w-full lg:su-w-[650px] su-h-[175px] lg:su-h-[350px] su-bottom-0 su-left-0">
      <div className="su-relative su-w-full su-h-full su-bottom-[-12px] lg:su-bottom-[-24px] su-bg-no-repeat su-bg-horizontal-card-sprinkles su-bg-right-top su-bg-cover su-scale-x-[-1] su-scale-y-[-1]"/>
      <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
        <div className="su-w-full su-h-full su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute"/>
        <div className="su-w-full su-h-full su-bg-gradient-to-l su-from-black-true su-to-transparent su-absolute"/>
      </div>
    </div>
  )
}

const BottomRightSprinkles = () => {
  return (
    <div className="su-max-h-full su-absolute su-w-[325px] su-max-w-full lg:su-w-[650px] su-h-[175px] lg:su-h-[350px] su-bottom-0 su-right-0">
      <div className="su-relative su-w-full su-h-full su-bottom-[-12px] lg:su-bottom-[-24px] su-bg-no-repeat su-bg-horizontal-card-sprinkles su-bg-right-top su-bg-cover su-scale-y-[-1]"/>
      <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
        <div className="su-w-full su-h-full su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute"/>
        <div className="su-w-full su-h-full su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute"/>
      </div>
    </div>
  )
}


const CardSprinkles = ({position}) => {
  return (
    <>
      {position === 'top_right' && <TopRightSprinkles/>}
      {position === 'top_left' && <TopLeftSprinkles/>}
      {position === 'bottom_right' && <BottomRightSprinkles/>}
      {position === 'bottom_left' && <BottomLeftSprinkles/>}
    </>
  )
}

export default CardSprinkles;