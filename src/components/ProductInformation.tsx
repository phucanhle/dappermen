import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/stores/cartStore";
import Product, { ProductSize } from "@/types/Products";
import { getProductSizes } from "@/services/productService";

export default function ProductInformation({ product }: { product: Product }) {
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setIsLoading(true);
    getProductSizes(product.id)
      .then((data) => {
        setSizes(data);
        setSelectedSize(data[0]?.size || null);
      })
      .catch(() => {
        toast.error("Failed to load size information!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [product.id]);

  const currentStock = sizes.find((s) => s.size === selectedSize)?.stock || 0;

  const handleIncrease = () => {
    if (quantity < currentStock) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    setIsAdding(true);

    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        image_src: product.image_src,
        price: product.price,
        size: selectedSize,
        quantity,
      });

      toast.success("🛒 Added to cart!");
      setIsAdding(false);
    }, 500); // giả lập delay
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-4 bg-neutral-100 p-4 md:px-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-2xl font-bold text-emerald-700">
        {product.price.toLocaleString("vi-VN")} VND
      </p>

      {/* Size selection */}
      <div>
        <h3 className="font-bold mb-1 text-sm text-gray-800">Size:</h3>

        {isLoading ? (
          <p className="text-sm text-gray-500 italic">
            Loading size information...
          </p>
        ) : sizes.length === 0 ? (
          <p className="text-sm text-red-500 italic">
            Size information is not available. We will update soon.
          </p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {sizes.map(({ size, stock }) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setQuantity(1);
                }}
                disabled={stock === 0}
                className={`w-11 h-11 flex items-center justify-center border font-semibold text-base uppercase transition cursor-pointer
            ${
              selectedSize === size
                ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                : "bg-white text-gray-800 border-gray-400 hover:bg-gray-200"
            }
            ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {!isLoading && selectedSize && (
          <p className="text-sm text-gray-500 mt-1">
            {currentStock > 0 ? `In stock: ${currentStock}` : "Out of stock"}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <h3 className="font-bold mb-1 text-sm text-gray-800">Quantity:</h3>
        <div className="flex items-center gap-6">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-10 h-10 border border-gray-400 bg-white hover:bg-gray-200 active:bg-gray-300 text-lg font-bold"
          >
            –
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= currentStock}
            className="w-10 h-10 border border-gray-400 bg-white hover:bg-gray-200 active:bg-gray-300 text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Total price */}
      <div>
        <p className="text-sm font-bold text-gray-900">Total:</p>
        <p className="text-xl font-bold text-gray-900">
          {(quantity * product.price).toLocaleString("vi-VN")} VND
        </p>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || currentStock === 0}
        className="flex mt-4 w-full md:w-fit bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold px-6 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAdding && (
          <svg
            className="mr-3 w-5 h-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
