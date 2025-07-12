export function Button ({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1 bg-green-100 text-green-900 border border-green-500 rounded cursor-pointer ${className}`}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}

export function ButtonSecond ({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`px-4 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-red-100 hover:border-red-300 hover:text-red-500 cursor-pointer ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}