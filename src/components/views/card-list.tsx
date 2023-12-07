import NodeCard from "@/components/node/node-card";

const CardList = ({items, h3Heading}) => {

  const gridClasses = [
    '',
    '@4xl:su-grid-cols-1-1',
    '@4xl:su-grid-cols-1-1 @7xl:su-grid-cols-1-1-1',
  ]
  const gridClass = items.length >= 3 ? gridClasses[2] : gridClasses[(items.length % 3) - 1]

  return (
    <div className="su-@container">
      <ul className={`su-list-unstyled su-grid su-gap-[90px] ${gridClass}`}>
        {items.filter(item => !!item?.id).map(item =>
          <li key={item.id} className="su-w-full su-max-w-[500px] su-mx-auto">
            <NodeCard node={item} key={item.id} h3Heading={h3Heading}/>
          </li>
        )}
      </ul>
    </div>
  )
}
export default CardList;