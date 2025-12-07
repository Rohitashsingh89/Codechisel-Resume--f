export default function DiagonalDivider() {
  return (
    <div className="fixed top-0 left-0 h-full w-2/5 pointer-events-none z-10">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="diagonalGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <polygon
          points="0,0 100,0 0,55"
          fill="url(#diagonalGradient)"
          className="opacity-40 dark:opacity-25 transition-opacity duration-300"
        />
      </svg>
    </div>
  );
}
