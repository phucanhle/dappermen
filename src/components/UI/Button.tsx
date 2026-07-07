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
            className={`px-6 py-2 bg-neutral-950 text-white font-sans font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-neutral-800 disabled:opacity-50 transition-all duration-200 rounded-lg cursor-pointer ${className}`}
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
            className={`px-6 py-2 bg-white text-neutral-800 font-sans font-semibold text-xs md:text-sm tracking-widest uppercase border border-neutral-200 hover:border-neutral-400 hover:text-black disabled:opacity-50 transition-all duration-200 rounded-lg cursor-pointer ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}