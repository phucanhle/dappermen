interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: TitleProps) {
  return (
    <h1
      className={`text-2xl line-clamp-1 max-w-7xl mx-auto font-semibold my-6 ${className}`}
    >
      {children}
    </h1>
  );
}

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Subtitle({ children, className = "" }: SubtitleProps) {
  return (
    <h2 className={`text-xl font-semibold line-clamp-1 my-6 ${className}`}>{children}</h2>
  );
}
