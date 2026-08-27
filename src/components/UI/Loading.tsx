export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-neutral-300 rounded-lg w-1/3" />
      <div className="h-10 bg-neutral-200 rounded-lg" />
      <div className="h-6 bg-neutral-300 rounded-lg w-1/3" />
      <div className="h-10 bg-neutral-200 rounded-lg" />
      <div className="h-6 bg-neutral-300 rounded-lg w-1/3" />
      <div className="space-y-2">
        <div className="h-10 bg-neutral-200 rounded-lg" />
        <div className="h-10 bg-neutral-200 rounded-lg" />
        <div className="h-10 bg-neutral-200 rounded-lg" />
      </div>
      <div className="flex gap-3 pt-4">
        <div className="h-10 w-24 bg-neutral-300 rounded-lg" />
        <div className="h-10 w-24 bg-neutral-200 rounded-lg" />
      </div>
    </div>
  );
}

export function LoadingSpin() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="w-10 h-10 border-4 border-neutral-500 border-dashed rounded-full animate-spin border-t-transparent" />
    </div>
  );
}

