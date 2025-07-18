"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import SizeGuide from "@/components/SizeGuide";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";
import { LoadingSpin } from "@/components/UI/Loading";
import Product from "@/types/Products";

const Imagebucket = process.env.NEXT_PUBLIC_IMAGE_BUCKET;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm!");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        toast.error("Không tìm thấy sản phẩm!");
        console.error(error);
      }
    };

    const fetchRelated = async () => {
      const res = await fetch(`/api/products/related/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setRelatedProducts(data);
    };

    if (id) {
      fetchRelated();
      fetchProduct();
    }
  }, [id]);

  if (!product)
    return (
      <div className="max-w-screen-xl min-h-screen mx-auto px-4 py-8">
        <LoadingSpin />
        <p className="text-center text-gray-500">Loading ...</p>
      </div>
    );

  const imageUrl = product.image_src
    ? `${Imagebucket}/${product.image_src}`
    : "/placeholder.png";
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      image_src: product.image_src,
      price: product.price,
      size: selectedSize,
      quantity,
    };

    addItem(item);
    toast.success("🛒 Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col gap-10">
      <div className="flex flex-wrap w-full justify-around gap-10 md:justify-between">
        {/* Image */}
        <div className=" items-center justify-center">
          <Image
            src={imageUrl}
            alt={product.name}
            width={320}
            height={430}
            className="object-cover"
          />
        </div>

        {/* Information */}
        <div className="flex-1 w-full flex flex-col bg-[#ebebeb] px-10 py-5">
          <p className="text-sm text-gray-600 mb-4">Mã sản phẩm (ID): {id}</p>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-2">
            {product.price.toLocaleString("vi-VN")} VND
          </p>

          {/* Size */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 border aspect-square cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Quantity:</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 border bg-white cursor-pointer"
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 border bg-white cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Total price */}
          <p className="text-xl text-gray-700 mb-4">
            TOTAL: {(quantity * product.price).toLocaleString("vi-VN")} VND
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-[#ebebeb] p-10 py-5">
        <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
        <div className="w-full">
          <div className="flex flex-wrap gap-4 md:flex-nowrap">
            <Image
              src={imageUrl}
              alt={product.name}
              width={1300}
              height={1300}
              className="object-cover w-full max-w-2xl"
            />
            <p className="text-sm text-gray-700 leading-6 w-full md:w-1/2">
              {product.description || "Relaxed fit. Cotton fabric..."}
            </p>
          </div>
          <div className="flex justify-between gap-4 mt-2 flex-wrap md:flex-nowrap">
            <Image
              src={imageUrl}
              alt={product.name}
              width={1300}
              height={1300}
              className="max-w-1/2"
            />
            <Image
              src={imageUrl}
              alt={product.name}
              width={1300}
              height={1300}
              className="max-w-1/2"
            />
          </div>
        </div>
        <SizeGuide />
      </div>

      {/* Reviews */}
      <div className="bg-[#ebebeb] p-10 py-5">
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

      {/* Related */}
      <div className="bg-[#ebebeb] p-10 py-5">
        <h2 className="text-lg font-bold mb-4">Related products</h2>
        <div className="overflow-x-auto">
          {relatedProducts.length > 0 && (
            <div className="flex gap-4" style={{ minWidth: "900px" }}>
              {relatedProducts.map((related: Product) => (
                <div key={related.id} className="flex-none w-[320px]">
                  <ProductCard
                    id={related.id}
                    name={related.name}
                    price={related.price}
                    image_src={related.image_src}
                    image_alt={related.name}
                    category={related.category}
                    release_date={related.release_date}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
