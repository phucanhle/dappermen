// src/components/ProductInformation.tsx
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

      toast.success("Added to cart successfully!");
      setIsAdding(false);
    }, 400);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6 bg-transparent p-0">
      {/* Product Category Label */}
      <div>
        <span className="text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase font-sans">
          {product.category || "Collection"}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight leading-snug mt-1">
          {product.name}
        </h1>
        <p className="text-xl font-sans font-semibold text-neutral-800 tracking-wide mt-2">
          {product.price.toLocaleString("vi-VN")} VND
        </p>
      </div>

      {/* Size Selection */}
      <div className="border-t border-[#EAE7E2]/60 pt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-sans font-semibold text-xs text-neutral-800 uppercase tracking-wider">
            Select Size
          </h3>
          {!isLoading && selectedSize && (
            <span className={`text-xs font-semibold ${currentStock > 0 ? "text-neutral-400" : "text-red-500"} font-sans`}>
              {currentStock > 0 ? `Stock: ${currentStock}` : "Out of stock"}
            </span>
          )}
        </div>

        {isLoading ? (
          <p className="text-xs text-neutral-400 italic font-sans py-2">
            Loading sizes...
          </p>
        ) : sizes.length === 0 ? (
          <p className="text-xs text-red-500 italic font-sans py-2">
            Sizes not available at the moment.
          </p>
        ) : (
          <div className="flex gap-2.5 flex-wrap">
            {sizes.map(({ size, stock }) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setQuantity(1);
                }}
                disabled={stock === 0}
                className={`w-11 h-11 flex items-center justify-center border font-sans font-semibold text-sm uppercase transition-all duration-200 rounded-lg cursor-pointer
                  ${
                    selectedSize === size
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                  }
                  ${stock === 0 ? "opacity-30 cursor-not-allowed line-through" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quantity & Order Total Block */}
      <div className="border-t border-[#EAE7E2]/60 pt-4 flex flex-wrap gap-8 items-end">
        {/* Quantity Controls */}
        <div>
          <h3 className="font-sans font-semibold text-xs text-neutral-800 uppercase tracking-wider mb-3">
            Quantity
          </h3>
          <div className="flex items-center border border-neutral-200 rounded-lg p-1 bg-white w-fit shadow-2xs">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-sm font-sans font-bold text-neutral-400 hover:text-black disabled:opacity-30 cursor-pointer"
            >
              –
            </button>
            <span className="w-10 text-center font-sans font-semibold text-sm text-neutral-800">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= currentStock}
              className="w-8 h-8 flex items-center justify-center text-sm font-sans font-bold text-neutral-400 hover:text-black disabled:opacity-30 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Order Total */}
        <div>
          <h3 className="font-sans font-semibold text-xs text-neutral-400 uppercase tracking-wider mb-2">
            Subtotal
          </h3>
          <p className="text-xl font-sans font-bold text-neutral-950 leading-none">
            {(quantity * product.price).toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>

      {/* Add to Cart Trigger */}
      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || currentStock === 0 || isAdding}
          className="w-full md:w-auto flex items-center justify-center gap-3 py-3.5 px-10 bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
        >
          {isAdding && (
            <svg
              className="w-4 h-4 animate-spin text-white"
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
          <span>{isAdding ? "Adding to Cart..." : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
