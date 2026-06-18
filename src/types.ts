export interface SnowflakeParticle {
  id: string;
  x: number;          // Left position percentage (0 to 100)
  size: number;       // Size in pixels (medium size, e.g. 16px to 28px)
  duration: number;   // Fall duration in seconds
  swayDistance: number; // Swing range left-and-right in pixels
  swayDuration: number; // Wave frequency duration in seconds
  opacity: number;    // Multi-layered depth
  rotateTo: number;   // Spin direction and angle
}

export interface BalloonParticle {
  id: string;
  x: number;          // Left position percentage (0 to 100)
  size: number;       // Width in pixels (medium size, e.g. 38px to 52px)
  color: string;      // Premium hex code
  darkColor: string;  // Premium dark hex version for 3D gradient shadows
  name: string;       // Name of the balloon color
  duration: number;   // Rise float duration in seconds
  swayDistance: number; // Swing range left-and-right in pixels
  swayDuration: number; // Wave frequency duration in seconds
  opacity: number;    // Translucency
  tiltAngle: number;  // Starting standard tilt angle in degrees
}

export type ActiveEffect = 'none' | 'snowflakes' | 'balloons';

export interface SoundPreset {
  id: string;
  label: string;
}
