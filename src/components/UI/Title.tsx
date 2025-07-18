interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: TitleProps) {
  return (
    <h1
      className={`text-2xl max-w-screen-xl mx-auto px-4 font-semibold my-6 ${className}`}
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
    <h2 className={`text-xl font-semibold my-6 ${className}`}>{children}</h2>
  );
}
