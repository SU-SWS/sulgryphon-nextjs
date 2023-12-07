import NodeCard from "@/components/node/node-card";

const CardList = ({items, h3Heading}) => {

  const gridClasses = [
    '',
    '@4xl:grid-cols-1-1',
    '@4xl:grid-cols-1-1 @7xl:grid-cols-1-1-1',
  ]
  const gridClass = items.length >= 3 ? gridClasses[2] : gridClasses[(items.length % 3) - 1]

  return (
    <div className="@container">
      <ul className={`list-unstyled grid gap-[90px] ${gridClass}`}>
        {items.filter(item => !!item?.id).map(item =>
          <li key={item.id} className="w-full max-w-[500px] mx-auto">
            <NodeCard node={item} key={item.id} h3Heading={h3Heading}/>
          </li>
        )}
      </ul>
    </div>
  )
}
export default CardList;