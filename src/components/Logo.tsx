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
                className="h-12 w-12"
                src="/logo.png"
                alt="Dapper Men Logo"
                width={48}
                height={48}
                priority
            />
        </Link>
    );
}
