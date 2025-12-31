export default function Container({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div className={`mx-auto w-full max-w-[var(--container)] px-4 ${className}`}>
        {children}
      </div>
    );
  }
  