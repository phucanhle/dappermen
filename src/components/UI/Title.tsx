export default function Title({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl font-semibold mb-6">
            {children}
        </h1>
    );
}

export function Subtitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xl font-semibold mb-4">
            {children}
        </h2>
    );
}