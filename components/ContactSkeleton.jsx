// components/ContactSkeleton.jsx

export default function ContactSkeleton() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8f4e8] via-[#f3e7d1] to-[#ede1d1] w-full overflow-hidden">
      {/* Hero Section skeleton */}
      <div className="relative bg-gradient-to-r from-brown-800 to-brown-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-8 bg-white/20 rounded w-80 mx-auto mb-6 animate-pulse" />
          <div className="h-16 bg-white/20 rounded w-3/4 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-white/20 rounded w-2/3 mx-auto mb-8 animate-pulse" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service selector skeleton */}
        <div className="text-center mb-8">
          <div className="h-6 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-gray-300 rounded w-80 mx-auto animate-pulse" />
        </div>

        {/* Primary booking buttons skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="h-16 bg-gray-300 rounded-xl animate-pulse" />
          <div className="h-16 bg-gray-300 rounded-xl animate-pulse" />
        </div>

        {/* Alternative contact methods skeleton */}
        <div className="mb-8">
          <div className="h-5 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-300 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Contact info cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-300 rounded-xl animate-pulse"
            />
          ))}
        </div>

        {/* Benefits section skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="text-center">
              <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
