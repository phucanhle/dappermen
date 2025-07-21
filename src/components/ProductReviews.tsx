import { AiFillStar } from "react-icons/ai";

export default function ProductReviews() {
  return (
    <div className="bg-neutral-100 border border-gray-200 px-4 md:px-8 py-5">
      <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Ryan</span>
          <div className="flex text-yellow-500">
            {[1, 2, 3, 4].map((star) => (
              <AiFillStar key={star} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-700 ml-6">
          Cotton is very cool. But, ...
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Adam</span>
          <div className="flex text-yellow-500">
            {[1, 2, 3].map((star) => (
              <AiFillStar key={star} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-700 ml-6">
          Cotton is very cool. But, ...
        </p>
      </div>
    </div>
  );
}
