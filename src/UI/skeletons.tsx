// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}>
      <div className="mb-2 flex justify-between items-center">
        <div className="h-6 w-32 rounded-md bg-gray-200" />
        <div className="h-4 w-16 rounded-md bg-gray-200" />
      </div>
      <div className="h-4 w-full rounded-md bg-gray-200 mb-2" />
      <div className="h-4 w-3/4 rounded-md bg-gray-200 mb-4" />
      <div className="flex mt-4 space-x-4">
        <div className="h-8 w-20 bg-gray-200 rounded-md" />
        <div className="h-8 w-20 bg-gray-200 rounded-md" />
        <div className="h-8 w-20 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}


export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      </div>
    </>
  );
}

export function ListTableSkeleton(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600">ID</th>
            <th className="py-3 px-4 text-left text-gray-600">Name</th>
            <th className="py-3 px-4 text-left text-gray-600">Date Created</th>
            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className={`${shimmer} h-4 w-12 rounded-md bg-gray-200`}></div>
              </td>
              <td className="py-3 px-4">
                <div className={`${shimmer} h-4 w-32 rounded-md bg-gray-200`}></div>
              </td>
              <td className="py-3 px-4">
                <div className={`${shimmer} h-4 w-24 rounded-md bg-gray-200`}></div>
              </td>
              <td className="py-3 px-4 flex space-x-2">
                <div className={`${shimmer} h-8 w-24 rounded-md bg-gray-200`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

