import Link from "next/link";

export default function Categories() {
    return (
        <div className="flex gap-4 w-full">
            <Link href="#products">Shoes</Link>
            <Link href="#products">Shoes</Link>
            <Link href="#products">Shoes</Link>
            <Link href="#products">Shoes</Link>
            <Link href="#products">Shoes</Link>
        </div>
    );
}
