import React from 'react';
import { Snowflake as SnowflakeIcon } from 'lucide-react';
import { SnowflakeParticle, BalloonParticle } from '../types';

interface ParticleCanvasProps {
  snowflakes: SnowflakeParticle[];
  balloons: BalloonParticle[];
  onRemoveSnowflake: (id: string) => void;
  onRemoveBalloon: (id: string) => void;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  snowflakes,
  balloons,
  onRemoveSnowflake,
  onRemoveBalloon,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {/* Snowflakes rendered when active */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          id={`snowflake-${flake.id}`}
          className="snowflake-particle text-sky-200/90 active:scale-110 transition-transform duration-200"
          style={{
            left: `${flake.x}%`,
            opacity: flake.opacity,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            filter: `drop-shadow(0 2px 4px rgba(224, 242, 254, 0.45))`,
            '--fall-duration': `${flake.duration}s`,
            '--sway-duration': `${flake.swayDuration}s`,
            '--sway-distance': `${flake.swayDistance}px`,
            '--rotate-to': `${flake.rotateTo}deg`,
          } as React.CSSProperties}
          onAnimationEnd={() => onRemoveSnowflake(flake.id)}
        >
          <SnowflakeIcon
            size={flake.size}
            strokeWidth={1.5}
            className="w-full h-full"
          />
        </div>
      ))}

      {/* Balloons rendered when active */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          id={`balloon-${balloon.id}`}
          className="balloon-particle"
          style={{
            left: `${balloon.x}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 2}px`, // accommodates balloon height and string
            '--float-duration': `${balloon.duration}s`,
            '--sway-duration': `${balloon.swayDuration}s`,
            '--sway-distance': `${balloon.swayDistance}px`,
            '--tilt-angle': `${balloon.tiltAngle}deg`,
          } as React.CSSProperties}
          onAnimationEnd={() => onRemoveBalloon(balloon.id)}
        >
          <svg
            className="balloon-inner"
            width="100%"
            height="100%"
            viewBox="0 0 60 120"
            style={{ opacity: balloon.opacity }}
          >
            <defs>
              <radialGradient
                id={`balloon-grad-${balloon.id}`}
                cx="35%"
                cy="35%"
                r="60%"
                fx="35%"
                fy="35%"
              >
                {/* 3D sphere gradient overlay */}
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="25%" stopColor={balloon.color} />
                <stop offset="100%" stopColor={balloon.darkColor} />
              </radialGradient>
            </defs>

            {/* Main Balloon Oval */}
            <ellipse
              cx="30"
              cy="40"
              rx="24"
              ry="31"
              fill={`url(#balloon-grad-${balloon.id})`}
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"
            />

            {/* Glossy 3D Highlight Curve */}
            <path
              d="M 16 28 A 16 21 0 0 1 34 14"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Tie Knot at bottom */}
            <polygon
              points="27,70 33,70 30,76"
              fill={balloon.darkColor}
            />

            {/* Wavy Floating String */}
            <path
              d="M 30,76 C 26,88 34,98 29,110 T 31,120"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="1.5,1.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
