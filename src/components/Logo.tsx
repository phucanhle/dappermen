import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link
            href="/"
            aria-label="Dapper Men Home"
            className="height-fit"
        >
            <Image
                className="h-16 w-16"
                src="/logo.png"
                alt="Dapper Men Logo"
                width={100}
                height={100}
                priority
            />
        </Link>
    );
}
