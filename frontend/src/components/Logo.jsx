export default function Logo({ className = 'h-10 w-10', rounded = 'rounded-2xl' }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden shadow-md shadow-indigo-600/20 ${rounded} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Deep Vibrant Brand Purple Background */}
        <rect width="100" height="100" fill="#622CF0" />

        {/* 1 (Upward Arrow with dual-tone head) */}
        {/* Shaft */}
        <rect x="23.5" y="32" width="6" height="34" rx="3" fill="#FFFFFF" />
        {/* Left Arrowhead (White) */}
        <path
          d="M26.5 24L15.5 35C14.7 35.8 14.7 37 15.5 37.8C16.3 38.6 17.5 38.6 18.3 37.8L26.5 29.6V24Z"
          fill="#FFFFFF"
        />
        {/* Right Arrowhead (Lighter Lilac Accent) */}
        <path
          d="M26.5 24L37.5 35C38.3 35.8 38.3 37 37.5 37.8C36.7 38.6 35.5 38.6 34.7 37.8L26.5 29.6V24Z"
          fill="#BFA5FF"
        />

        {/* Letter 'F' */}
        {/* Vertical stem */}
        <rect x="39" y="24" width="6" height="42" rx="3" fill="#FFFFFF" />
        {/* Top bar */}
        <rect x="39" y="24" width="22" height="6" rx="3" fill="#FFFFFF" />
        {/* Middle bar */}
        <rect x="39" y="42" width="16" height="6" rx="3" fill="#FFFFFF" />

        {/* Letter 'i' */}
        {/* Dot */}
        <circle cx="68" cy="27" r="3.2" fill="#FFFFFF" />
        {/* Stem */}
        <rect x="65" y="36" width="6" height="30" rx="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
