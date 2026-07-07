import { cartItem } from "@/types/CartItem";
import Link from "next/link";

type Props = {
  items: cartItem[];
  delivery?: number;
};

export default function OrderSummary({
  items,
  delivery = 0,
}: Props) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = 40000; // 40k VAT
  const total = subtotal + delivery + tax;

  return (
    <div className="bg-[#FAF8F5] border border-[#EAE7E2] rounded-2xl p-6 h-fit w-full max-w-md shadow-xs animate-fade-in">
      <h2 className="font-serif text-lg font-normal text-neutral-900 tracking-wide border-b border-[#EAE7E2]/60 pb-3 mb-4">
        Order Summary
      </h2>

      {/* Product List Summary */}
      <div className="mb-4 space-y-3 text-xs border-b border-[#EAE7E2]/60 pb-4">
        {items.length === 0 ? (
          <p className="text-neutral-400 font-sans italic text-center py-2">No items in cart</p>
        ) : (
          items.map((item) => (
            <div key={item.id + item.size} className="flex justify-between items-center text-neutral-600">
              <span className="font-sans leading-relaxed">
                {item.name} <span className="text-neutral-400 text-[10px] font-semibold">x{item.quantity}</span>
              </span>
              <span className="font-semibold text-neutral-800 font-sans">
                {(item.price * item.quantity).toLocaleString()} VND
              </span>
            </div>
          ))
        )}
      </div>

      {/* Pricing breakdown */}
      <div className="space-y-2 text-xs border-b border-[#EAE7E2]/60 pb-4 mb-4 font-sans">
        <div className="flex justify-between text-neutral-500">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>Delivery</span>
          <span className={delivery === 0 ? "text-emerald-600 font-semibold" : ""}>
            {delivery === 0 ? "FREE" : `${delivery.toLocaleString()} VND`}
          </span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>Included 10% VAT</span>
          <span>{tax.toLocaleString()} VND</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm font-sans font-semibold text-neutral-900 mb-6">
        <span>TOTAL</span>
        <span className="text-base text-neutral-950 font-bold">
          {total.toLocaleString()} VND
        </span>
      </div>

      <Link 
        href="/checkout"
        className="block text-center w-full py-3.5 bg-neutral-950 text-white font-sans text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-200 rounded-lg cursor-pointer shadow-sm"
      >
        Check out
      </Link>
    </div>
  );
}
