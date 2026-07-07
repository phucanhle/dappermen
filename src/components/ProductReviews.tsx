// src/components/ProductReviews.tsx
export default function ProductReviews() {
  const reviews = [
    {
      name: "Ryan",
      rating: 5,
      comment: "The pima cotton fabric is exceptionally soft and lightweight. It fits exactly as expected and keeps its shape well after washing.",
      date: "Oct 12, 2025"
    },
    {
      name: "Adam",
      rating: 4,
      comment: "Very clean stitching and premium feel. Perfect for smart-casual layering.",
      date: "Nov 04, 2025"
    }
  ];

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="font-serif text-2xl font-normal text-neutral-900 mb-6 border-b border-[#EAE7E2]/60 pb-3">
        Customer Reviews
      </h2>
      
      <div className="space-y-6">
        {reviews.map((rev, i) => (
          <div key={i} className="border-b border-[#EAE7E2]/60 pb-5 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-sm text-neutral-800">
                  {rev.name}
                </span>
                
                {/* Gold SVG Stars */}
                <div className="flex text-[#d4af37]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < rev.rating ? "fill-[#d4af37] text-[#d4af37]" : "fill-neutral-200 text-neutral-200"
                      }`}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <span className="text-[11px] text-neutral-400 font-sans">
                {rev.date}
              </span>
            </div>
            <p className="text-sm text-neutral-500 font-sans leading-relaxed mt-2 pl-0">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
