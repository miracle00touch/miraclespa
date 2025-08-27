// components/LocationSkeleton.jsx

export default function LocationSkeleton() {
  return (
    <div className="min-h-screen bg-[#f3e7d1] w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-12">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-300 rounded w-3/4 max-w-2xl mx-auto animate-pulse" />
        </div>

        {/* Location info skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full max-w-md animate-pulse">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4" />
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-full" />
              <div className="h-5 bg-gray-300 rounded w-5/6 mx-auto" />
              <div className="h-5 bg-gray-300 rounded w-4/5 mx-auto" />
            </div>
            <div className="h-12 bg-gray-300 rounded w-full mt-6" />
          </div>
        </div>

        {/* Cities grid skeleton */}
        <div className="mt-8 text-center w-full max-w-4xl">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-6 animate-pulse" />

          {/* Cities grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="h-6 bg-gray-300 rounded animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Footer note skeleton */}
        <div className="text-center mt-8">
          <div className="h-4 bg-gray-300 rounded w-2/3 max-w-2xl mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
