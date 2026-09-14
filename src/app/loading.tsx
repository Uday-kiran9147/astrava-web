export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2D5BFF]/20 border-t-[#2D5BFF] rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">Loading Astrava...</p>
      </div>
    </div>
  );
}
