const TopRightSprinkles = () => {
  return (
    <div className="max-h-full absolute w-[325px] max-w-full lg:w-[650px] h-[175px] lg:h-[350px] top-0 right-0">
      <div className="relative w-full h-full top-[-12px] lg:top-[-24px] bg-no-repeat bg-horizontal-card-sprinkles bg-right-top bg-cover"/>
      <div className="absolute w-full h-full top-0 right-0">
        <div className="w-full h-full bg-gradient-to-t from-black-true to-transparent absolute"/>
        <div className="w-full h-full bg-gradient-to-r from-black-true to-transparent absolute"/>
      </div>
    </div>
  )
}

const TopLeftSprinkles = () => {
  return (
    <div className="max-h-full absolute w-[325px] max-w-full lg:w-[650px] h-[175px] lg:h-[350px] top-0 left-0">
      <div className="relative w-full h-full top-[-12px] lg:top-[-24px] bg-no-repeat bg-horizontal-card-sprinkles bg-right-top bg-cover scale-x-[-1]"/>
      <div className="absolute w-full h-full top-0 right-0">
        <div className="w-full h-full bg-gradient-to-t from-black-true to-transparent absolute"/>
        <div className="w-full h-full bg-gradient-to-l from-black-true to-transparent absolute"/>
      </div>
    </div>
  )
}

const BottomLeftSprinkles = () => {
  return (
    <div className="max-h-full absolute w-[325px] max-w-full lg:w-[650px] h-[175px] lg:h-[350px] bottom-0 left-0">
      <div className="relative w-full h-full bottom-[-12px] lg:bottom-[-24px] bg-no-repeat bg-horizontal-card-sprinkles bg-right-top bg-cover scale-x-[-1] scale-y-[-1]"/>
      <div className="absolute w-full h-full top-0 right-0">
        <div className="w-full h-full bg-gradient-to-b from-black-true to-transparent absolute"/>
        <div className="w-full h-full bg-gradient-to-l from-black-true to-transparent absolute"/>
      </div>
    </div>
  )
}

const BottomRightSprinkles = () => {
  return (
    <div className="max-h-full absolute w-[325px] max-w-full lg:w-[650px] h-[175px] lg:h-[350px] bottom-0 right-0">
      <div className="relative w-full h-full bottom-[-12px] lg:bottom-[-24px] bg-no-repeat bg-horizontal-card-sprinkles bg-right-top bg-cover scale-y-[-1]"/>
      <div className="absolute w-full h-full top-0 right-0">
        <div className="w-full h-full bg-gradient-to-b from-black-true to-transparent absolute"/>
        <div className="w-full h-full bg-gradient-to-r from-black-true to-transparent absolute"/>
      </div>
    </div>
  )
}


const CardSprinkles = ({position}: { position: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' }) => {
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