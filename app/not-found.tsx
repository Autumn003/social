import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="xl:col-span-4 md:col-span-7 col-span-10 border-x h-full border-gray-800">
        <div className="flex flex-col items-center my-24">
            <h2 className="md:text-2xl text-xl font-semibold">404 Not Found</h2>
            <p className="">Could not find requested resource</p>
            <Link href="/" className='border-b text-blue-400 border-blue-400'>Return Home</Link>
        </div>
    </div>
  )
}