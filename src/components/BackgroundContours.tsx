import React from 'react';

export const BackgroundContours: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Base Canvas: Golden Wheat/Corn Yellow */}
      <div className="absolute inset-0 bg-[#f9e49d]" />

      {/* SVG Layer for organic topographic agricultural contours with drop shadows */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle drop shadow to give layered paper / topographic contour depth */}
          <filter id="contour-shadow" x="-5%" y="-5%" width="120%" height="120%">
            <feDropShadow
              dx="4"
              dy="5"
              stdDeviation="6"
              floodColor="#293020"
              floodOpacity="0.22"
            />
          </filter>
          <filter id="contour-shadow-right" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="-4"
              dy="5"
              stdDeviation="6"
              floodColor="#293020"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        {/* 
          Top-Right Organic Green Contour
          Starts along top edge around x=820, curves down toward center-right (x=850, y=140),
          then curves out toward the right edge (x=1440, y=780).
        */}
        <path
          d="M 830 0
             C 800 60, 830 180, 880 230
             C 960 310, 1070 380, 1020 540
             C 990 620, 1100 670, 1260 710
             C 1360 735, 1420 800, 1440 850
             L 1440 0 Z"
          fill="#b8cca4"
          filter="url(#contour-shadow-right)"
          stroke="#383d30"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 
          Left & Bottom Organic Green Contour
          Starts on left edge around y=240, curves rightward down (x=120, y=360),
          curves to (x=380, y=515), then dips under center card (x=500, y=510),
          curves down through the bottom center (x=660, y=790) to (x=690, y=900),
          then covers the left edge down to bottom left (x=0, y=900).
        */}
        <path
          d="M 0 240
             C 50 250, 80 320, 140 430
             C 210 540, 290 520, 390 512
             C 470 505, 480 610, 520 670
             C 570 740, 640 760, 670 900
             L 0 900 Z"
          fill="#b8cca4"
          filter="url(#contour-shadow)"
          stroke="#383d30"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
