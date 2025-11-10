export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-6">
        <div className="h-7 bg-gray-200 rounded-lg mb-3 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/2" />
        <div className="h-8 bg-gray-200 rounded-full w-24" />
      </div>
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-6xl mx-auto animate-pulse">
        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded-lg mb-4 w-2/3" />
          <div className="flex flex-wrap gap-4">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Main image skeleton */}
        <div className="mb-8">
          <div className="aspect-video bg-gray-200 rounded-2xl" />
        </div>

        {/* Description skeleton */}
        <div className="mb-12">
          <div className="h-6 bg-gray-200 rounded-lg mb-4 w-40" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
