import NodeCard from "@/components/node/node-card"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

const CardList = ({items, h3Heading}: {items: NodeUnion[]; h3Heading?: boolean}) => {
  const gridClasses = ["", "@4xl:grid-cols-2", "@4xl:grid-cols-2 @7xl:grid-cols-3"]
  const gridClass = items.length >= 3 ? gridClasses[2] : gridClasses[(items.length % 3) - 1]

  return (
    <div className="@container">
      <ul className={twMerge("list-unstyled grid gap-40", gridClass)}>
        {items
          .filter(item => !!item?.uuid)
          .map(item => (
            <li key={item.uuid} className="mx-auto w-full">
              <NodeCard node={item} key={item.uuid} h3Heading={h3Heading} />
            </li>
          ))}
      </ul>
    </div>
  )
}
export default CardList
