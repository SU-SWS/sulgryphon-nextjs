import {flushPathCache} from "@/components/patterns/elements/flush-cache-action"

const FlushCache = ({currentPath}: {currentPath: string}) => {
  return (
    <form action={flushPathCache} className="fixed bottom-0 z-50">
      <input type="hidden" name="path" value={currentPath} />
      <button type="submit" className="rounded-full bg-white p-4 hocus:underline">
        Clear this page cache
      </button>
    </form>
  )
}

export default FlushCache
