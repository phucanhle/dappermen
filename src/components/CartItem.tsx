// Kiểu dữ liệu cho từng sản phẩm
type CartItemProps = {
    id: number;
    imageSrc: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    onDelete?: () => void;
    onQuantityChange?: (qty: number) => void;
};
import Image from "next/image";

// Component hiển thị một sản phẩm trong giỏ
export default function CartItem({
    id,
    imageSrc,
    name,
    price,
    size,
    quantity,
    onDelete,
    onQuantityChange,
}: CartItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border border-gray-300 p-4 w-full ">
            <div className="flex items-start sm:items-center">
                <Image
                    src={imageSrc}
                    alt={name}
                    width={250}
                    height={250}
                    className="w-64 h-64 object-cover mr-4"
                />
                <div className="flex flex-col h-64 items-start justify-start">
                    <h3 className="text-lg font-medium">
                        {name}
                    </h3>
                    <p className="text-gray-600">
                        {price.toLocaleString()} VND
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        SIZE: {size}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                        <label
                            htmlFor={`quantity-${id}`}
                            className="text-sm text-gray-700"
                        >
                            Quantity:
                        </label>
                        <select
                            id={`quantity-${id}`}
                            className="border border-gray-300 px-2 py-1 cursor-pointer "
                            value={quantity}
                            onChange={(e) =>
                                onQuantityChange?.(
                                    Number(e.target.value)
                                )
                            }
                        >
                            {Array.from(
                                { length: 10 },
                                (_, i) => i + 1
                            ).map((val) => (
                                <option
                                    key={val}
                                    value={val}
                                >
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button
                className="text-black hover:underline hover:text-red-400 cursor-pointer mt-4 sm:mt-0"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
}
