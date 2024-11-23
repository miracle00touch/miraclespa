// app/loading.js

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="w-20 h-20 border-8 border-brown-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
