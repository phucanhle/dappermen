import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" aria-label="Dapper Men Home" className="text-4xl font-bold">
            <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                {/* Biểu tượng cách điệu */}
                <polygon points="50,20 60,50 50,80 40,50" fill="black" />
                {/* Tên thương hiệu */}
                <text
                    x="80"
                    y="60"
                    fontFamily="Arial, sans-serif"
                    fontSize="32"
                    fill="black"
                    fontWeight="bold"
                    textAnchor="start"
                >
                    Dapper Men
                </text>
            </svg>
        </Link>
    );
}
