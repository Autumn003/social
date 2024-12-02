import { Bookmarks } from "@/components/Bookmarks";

export default function BookmarksPage() {
  return (
    <div className="xl:col-span-5 md:col-span-7 col-span-10 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
        <div>
            <Bookmarks/>
        </div>
    </div>
  )
}