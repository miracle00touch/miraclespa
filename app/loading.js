// app/loading.js

export default function Loading() {
  // Simple loading component that only shows when Next.js actually needs it
  return (
    <div className="min-h-[50vh] bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-brown-200 border-t-brown-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-brown-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
