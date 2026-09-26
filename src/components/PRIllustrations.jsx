import React from "react";

export function MegaphoneIllustration({ className = "w-full h-auto" }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="speakerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2765e" />
          <stop offset="100%" stopColor="#315b8c" />
        </linearGradient>
        <linearGradient id="beamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f2765e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f7f4ed" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Acoustic Blast Wave Cones */}
      <path
        d="M220 150 L380 50 L380 250 Z"
        fill="url(#beamGrad)"
        opacity="0.35"
      />
      <path
        d="M240 150 L370 80 L370 220 Z"
        fill="url(#beamGrad)"
        opacity="0.4"
      />

      {/* Floating Sparkles & Code Badges */}
      <circle cx="310" cy="90" r="5" fill="#f2765e" className="animate-ping" />
      <circle cx="340" cy="180" r="4" fill="#315b8c" />
      <circle cx="280" cy="220" r="6" fill="#e8c9a8" />

      {/* Floating Tag: +100 XP */}
      <g transform="translate(290, 60)" className="animate-bounce">
        <rect
          width="64"
          height="24"
          rx="12"
          fill="#201915"
          stroke="#f2765e"
          strokeWidth="1.5"
        />
        <text
          x="32"
          y="16"
          fill="#f7f4ed"
          fontSize="10"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          +100 XP
        </text>
      </g>

      {/* Floating Tag: CSI BU */}
      <g transform="translate(300, 210)">
        <rect width="70" height="24" rx="6" fill="#f2765e" />
        <text
          x="35"
          y="16"
          fill="#201915"
          fontSize="10"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          OUTREACH
        </text>
      </g>

      {/* Megaphone Body */}
      <path
        d="M120 120 L210 90 L210 210 L120 180 Z"
        fill="url(#speakerGrad)"
        stroke="#201915"
        strokeWidth="3"
      />
      <ellipse
        cx="210"
        cy="150"
        rx="14"
        ry="60"
        fill="#f2765e"
        stroke="#201915"
        strokeWidth="3"
      />

      {/* Handle */}
      <path
        d="M135 180 L125 240 L150 236 L155 180 Z"
        fill="#201915"
        stroke="#315b8c"
        strokeWidth="2"
      />

      {/* Mic/Speaker Base */}
      <rect
        x="80"
        y="125"
        width="40"
        height="50"
        rx="10"
        fill="#201915"
        stroke="#f2765e"
        strokeWidth="2.5"
      />
      <circle cx="95" cy="150" r="6" fill="#f2765e" />
      <line
        x1="88"
        y1="135"
        x2="88"
        y2="165"
        stroke="#f7f4ed"
        strokeWidth="2"
        opacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="132"
        x2="95"
        y2="168"
        stroke="#f7f4ed"
        strokeWidth="2"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PodiumIllustration({ className = "w-full h-auto" }) {
  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 2nd Place Pillar */}
      <g transform="translate(30, 80)">
        <path
          d="M0 0 L85 0 L85 130 L0 130 Z"
          fill="#315b8c"
          stroke="#201915"
          strokeWidth="2.5"
        />
        <rect x="0" y="0" width="85" height="12" fill="#4678b2" />
        <circle
          cx="42"
          cy="40"
          r="18"
          fill="#201915"
          stroke="#f7f4ed"
          strokeWidth="2"
        />
        <text
          x="42"
          y="47"
          fill="#f7f4ed"
          fontSize="18"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          2
        </text>
        <text
          x="42"
          y="85"
          fill="#f7f4ed"
          fontSize="10"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
          opacity="0.8"
        >
          SILVER
        </text>
      </g>

      {/* 1st Place Pillar (Tallest) */}
      <g transform="translate(135, 40)">
        <path
          d="M0 0 L90 0 L90 170 L0 170 Z"
          fill="#f2765e"
          stroke="#201915"
          strokeWidth="2.5"
        />
        <rect x="0" y="0" width="90" height="14" fill="#f69985" />

        {/* Crown / Trophy icon */}
        <path
          d="M30 -22 L45 -34 L60 -22 L55 -6 L35 -6 Z"
          fill="#fbd38d"
          stroke="#201915"
          strokeWidth="2"
        />
        <circle cx="45" cy="-20" r="3" fill="#f2765e" />

        <circle
          cx="45"
          cy="45"
          r="22"
          fill="#201915"
          stroke="#fbd38d"
          strokeWidth="2.5"
        />
        <text
          x="45"
          y="53"
          fill="#fbd38d"
          fontSize="22"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          1
        </text>
        <text
          x="45"
          y="95"
          fill="#201915"
          fontSize="11"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
        >
          CHAMPION
        </text>
      </g>

      {/* 3rd Place Pillar */}
      <g transform="translate(245, 110)">
        <path
          d="M0 0 L85 0 L85 100 L0 100 Z"
          fill="#e8c9a8"
          stroke="#201915"
          strokeWidth="2.5"
        />
        <rect x="0" y="0" width="85" height="12" fill="#f4dfc7" />
        <circle
          cx="42"
          cy="35"
          r="16"
          fill="#201915"
          stroke="#f7f4ed"
          strokeWidth="2"
        />
        <text
          x="42"
          y="42"
          fill="#f7f4ed"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          3
        </text>
        <text
          x="42"
          y="70"
          fill="#201915"
          fontSize="10"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
          opacity="0.8"
        >
          BRONZE
        </text>
      </g>

      {/* Floating Starbursts */}
      <path
        d="M180 8 L183 15 L190 18 L183 21 L180 28 L177 21 L170 18 L177 15 Z"
        fill="#fbd38d"
      />
      <path
        d="M70 50 L72 55 L77 57 L72 59 L70 64 L68 59 L63 57 L68 55 Z"
        fill="#f2765e"
      />
    </svg>
  );
}

export function ReferralKeyCard({
  enrollment = "S24CSEU1214",
  className = "w-full max-w-sm",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-soil text-cream p-5 border border-blush/40 shadow-xl ${className}`}
    >
      {/* Background Tech Circuit line */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-radial from-blush/20 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between border-b border-cream/15 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blush flex items-center justify-center text-soil font-black text-xs">
            BU
          </div>
          <span className="font-mono text-xs text-cream/70 uppercase tracking-widest">
            CSI RECRUITMENT PASS
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[0.62rem] font-mono uppercase tracking-wider">
          VERIFIED REFERRAL
        </span>
      </div>

      <div className="my-3">
        <span className="text-[0.65rem] font-mono text-cream/50 uppercase tracking-wider">
          RECRUITMENT KEY:
        </span>
        <p className="font-mono text-2xl font-black text-blush tracking-wider mt-0.5">
          {enrollment}
        </p>
      </div>

      <div className="flex items-center justify-between text-[0.72rem] text-cream/60 font-mono pt-1">
        <span>REWARD: +100 XP / VERIFIED ATTENDEE</span>
        <span className="text-cream">BENNETT UNIV</span>
      </div>
    </div>
  );
}
