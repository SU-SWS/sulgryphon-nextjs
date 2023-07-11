const StanfordSpacer = ({size}) => {
  let height;
  switch (size) {
    case 'su-spacer-reduced':
      height = 'su-min-h-[20px]';

      break;
    case 'su-spacer-minimal':
      height = 'su-min-h-[10px]';

      break;
    default:
      height = 'su-min-h-[40px]'
  }
  return (
    <div className={height}/>
  )
}
export default StanfordSpacer;