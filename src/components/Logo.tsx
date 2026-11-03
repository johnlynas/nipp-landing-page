type LogoProps = {
  /** 'dark' renders for dark backgrounds (navy hero/footer), 'light' for white. */
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Property NI wordmark + "The Doorway" mark: an arched doorway with an amber
 * keyhole — one portal, one entry point. Inline SVG so it inherits crispness
 * at any size and needs no image pipeline.
 */
export default function Logo({ tone = 'light', className = '' }: LogoProps) {
  const ink = tone === 'dark' ? '#ffffff' : '#16223a';
  const line = tone === 'dark' ? '#f1f5f9' : '#16223a';
  return (
    <svg
      viewBox="0 0 240 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Property NI"
      className={className}
    >
      <g stroke={line} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 58 V26 a18 18 0 0 1 36 0 V58" />
        <line x1="6" y1="58" x2="58" y2="58" />
      </g>
      <circle cx="32" cy="30" r="6.5" fill="#f5a623" />
      <path d="M32 34 L28.5 47 h7 Z" fill="#f5a623" />
      <text
        x="76"
        y="41"
        style={{ fontFamily: "var(--font-sora, Inter, -apple-system, 'Segoe UI', sans-serif)" }}
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.5"
        fill={ink}
      >
        Property NI
      </text>
    </svg>
  );
}
