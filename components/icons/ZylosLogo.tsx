import React from 'react';

export const ZylosLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_2)">
      <rect width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.1"/>
      <path
        d="M25 20 L75 20 L25 80 L75 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10 L85 10 L85 90 L15 90 L15 10 M25 20 L75 20 L25 80 L75 80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <path d="M15 50 L10 50 M10 45 L5 45 M10 55 L5 55 M5 45 V 35 L10 30 M5 55 V 65 L10 70" stroke="currentColor" strokeWidth="2" />
       <path d="M50 15 L50 10 M45 10 L45 5 M55 10 L55 5 M45 5 H 35 L 30 10 M55 5 H 65 L 70 10" stroke="currentColor" strokeWidth="2" />
       <path d="M85 50 L90 50 M90 45 L95 45 M90 55 L95 55 M95 45 V 35 L90 30 M95 55 V 65 L90 70" stroke="currentColor" strokeWidth="2" />
       <path d="M50 85 L50 90 M45 90 L45 95 M55 90 L55 95 M45 95 H 35 L 30 90 M55 95 H 65 L 70 90" stroke="currentColor" strokeWidth="2" />

    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <rect width="100" height="100" rx="20" />
      </clipPath>
    </defs>
  </svg>
);