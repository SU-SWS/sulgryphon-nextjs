import useIsCentered from "@/lib/hooks/useIsCentered";

const FullScreenBackground = ({children, compareRef, ...props}) => {
  const isCentered = useIsCentered(compareRef);
  return (
    <div className={(isCentered ? " su-w-screen su-ml-[calc(-50vw+50%)] " : "su-w-full ") + "su-absolute su-z-[-10]  su-h-full su-top-0 su-left-0"}>
      <div className="su-relative su-w-full su-h-full su-bg-black-true" {...props}>
        {children}
      </div>
    </div>
  )
}

export default FullScreenBackground