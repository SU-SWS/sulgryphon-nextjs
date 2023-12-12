const ImageLoader = ({src, width}: { src: string, width: number }) => {
  const imageStyles = [
    {w: 128, s: 'breakpoint_sm_2x'},
    {w: 384, s: 'breakpoint_md_2x'},
    {w: 400, s: 'breakpoint_md_2x'},
    {w: 750, s: 'breakpoint_lg_2x'},
    {w: 1200, s: 'breakpoint_xl_2x'},
    {w: 9999999, s: 'breakpoint_2xl_2x'},
  ];
  // Find the first image style that is larger than the desired width.
  const style = imageStyles.find(s => s.w >= width)?.s;

  // Switch the image style for the desired width. Add the width parameter just to prevent console logs.
  // https://nextjs.org/docs/messages/next-image-missing-loader-width
  return src.toString().replace(/styles\/\w+\//, `styles/${style}/`) + `&w=${width}`;
}
export default ImageLoader;