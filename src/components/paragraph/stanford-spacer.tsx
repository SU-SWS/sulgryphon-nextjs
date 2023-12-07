const StanfordSpacer = ({size}: { size: 'spacer-reduced' | 'spacer-minimal' | string }) => {
  let height;
  switch (size) {
    case 'spacer-reduced':
      height = 'min-h-[20px]';

      break;
    case 'spacer-minimal':
      height = 'min-h-[10px]';

      break;
    default:
      height = 'min-h-[40px]'
  }
  return (
    <div className={height}/>
  )
}
export default StanfordSpacer;