import React from 'react';

interface AgriLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AgriLogo: React.FC<AgriLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision SVG Sprout/Planter Logo matching the screenshot */}
      <svg
        className={`${iconSizes[size]} text-[#165b2d] shrink-0`}
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AgriConnect Logo Icon"
      >
        {/* Left Sprout Leaf */}
        <path
          d="M 48 38 C 45 28 32 16 16 16 C 14 26 22 41 38 44 C 43 45 46 42 48 38 Z"
          fill="currentColor"
        />
        {/* Right Sprout Leaf */}
        <path
          d="M 52 38 C 55 28 68 16 84 16 C 86 26 78 41 62 44 C 57 45 54 42 52 38 Z"
          fill="currentColor"
        />
        {/* Center Stem */}
        <path
          d="M 47 38 L 53 38 L 53 49 L 47 49 Z"
          fill="currentColor"
        />
        {/* Horizontal Pot Rim / Bar */}
        <rect
          x="12"
          y="48"
          width="76"
          height="12"
          rx="2"
          fill="currentColor"
        />
        {/* Lower Planter Pot Body with horizontal accent slot */}
        <path
          d="M 18 64 L 82 64 L 75 92 L 25 92 Z"
          fill="currentColor"
        />
        {/* Pot Horizontal accent groove (as seen in stylized agri planter icon) */}
        <rect
          x="14"
          y="72"
          width="72"
          height="7"
          rx="1.5"
          fill="currentColor"
        />
      </svg>

      {showText && (
        <span
          className={`font-bold tracking-tight text-[#25633a] font-sans ${textSizes[size]}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          AgriConnect
        </span>
      )}
    </div>
  );
};
