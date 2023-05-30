import NodeCard from "@/components/node/node-card";

const CardList = ({items}) => {
  return (
    <ul className="su-list-unstyled su-@container su-flex su-flex-wrap su-justify-around su-gap-2xl">
      {items.map(item =>
        <li key={item.id} className="su-min-w-[250px] @6xl:su-min-w-[400px] su-flex-1 su-max-w-[500px]">
          <NodeCard node={item} key={item.id}/>
        </li>
      )}
    </ul>
  )
}
export default CardList;