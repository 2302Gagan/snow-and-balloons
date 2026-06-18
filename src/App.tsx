import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { SnowflakeParticle, BalloonParticle, ActiveEffect } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Dashboard } from './components/Dashboard';
import { playSnowflakeSound, playBalloonSound } from './utils/audio';

// Custom-designed aesthetic, highly visual balloon palettes
const BALLOON_PALETTES = [
  { main: '#f43f5e', dark: '#9f1239', name: 'Ruby Sunset' },      // Rose Red
  { main: '#0ea5e9', dark: '#0369a1', name: 'Sapphire Skies' },   // Light Sky Blue
  { main: '#10b981', dark: '#065f46', name: 'Emerald Forest' },   // Emerald Green
  { main: '#f59e0b', dark: '#b45309', name: 'Vintage Gold' },     // Yellow/Gold
  { main: '#8b5cf6', dark: '#5b21b6', name: 'Royal Amethyst' },   // Velvet Purple
  { main: '#ec4899', dark: '#9d174d', name: 'Bubble Rose' },      // Cool Pink
  { main: '#f97316', dark: '#c2410c', name: 'Coral Amber' }       // Orange
];

export default function App() {
  const [activeEffect, setActiveEffect] = useState<ActiveEffect>('none');
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [snowflakes, setSnowflakes] = useState<SnowflakeParticle[]>([]);
  const [balloons, setBalloons] = useState<BalloonParticle[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);

  // References to keep track of dynamic intervals and timeouts smoothly
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const generatorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all running background tasks instantly
  const clearAllIntervals = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (generatorIntervalRef.current) {
      clearInterval(generatorIntervalRef.current);
      generatorIntervalRef.current = null;
    }
    if (timerEndTimeoutRef.current) {
      clearTimeout(timerEndTimeoutRef.current);
      timerEndTimeoutRef.current = null;
    }
  };

  // Build a newly randomized, beautifully styled Snowflake particle
  const generateSnowflake = (isInitial: boolean = false): SnowflakeParticle => {
    const id = `${Date.now()}-${Math.random()}`;
    const size = 16 + Math.ceil(Math.random() * 11); // Medium sizes: 16px to 27px
    const duration = 3.5 + Math.random() * 2.0;      // Time to reach bottom: 3.5s to 5.5s
    const swayDistance = -30 + Math.random() * 60;   // Left-and-right sway: -30px to 30px
    const swayDuration = 2.0 + Math.random() * 2.0;  // Sway speed period: 2s to 4s
    const opacity = 0.55 + Math.random() * 0.45;     // Depth layering transparent opacity
    const rotateTo = 180 + Math.random() * 360;      // Rotates continuously

    return {
      id,
      x: Math.random() * 100, // Random percentage offset
      size,
      duration,
      swayDistance,
      swayDuration,
      opacity,
      rotateTo,
    };
  };

  // Build a newly randomized, beautiful 3D-gradient Balloon particle
  const generateBalloon = (isInitial: boolean = false): BalloonParticle => {
    const id = `${Date.now()}-${Math.random()}`;
    const size = 36 + Math.ceil(Math.random() * 14); // Medium sizes: 36px to 50px
    const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
    const duration = 4.0 + Math.random() * 2.2;      // Time to soar over the top: 4s to 6.2s
    const swayDistance = -40 + Math.random() * 80;   // Wobble sway: -40px to 40px
    const swayDuration = 2.5 + Math.random() * 2.0;  // Wobble swing speed
    const opacity = 0.85 + Math.random() * 0.15;     // Clean polished gloss opacity
    const tiltAngle = -15 + Math.random() * 30;     // Tilt wobble degrees

    return {
      id,
      x: 6 + Math.random() * 88, // Inset from left/right margins to look great
      size,
      color: palette.main,
      darkColor: palette.dark,
      name: palette.name,
      duration,
      swayDistance,
      swayDuration,
      opacity,
      tiltAngle,
    };
  };

  // Spawn Snowflake precipitation
  const triggerSnowflakes = () => {
    // Clear any currently running animations or timers
    clearAllIntervals();
    setActiveEffect('snowflakes');
    
    // Play ice chime synthesize sound if enabled
    if (soundEnabled) {
      playSnowflakeSound();
    }

    // Spawn a lush immediate burst: 14 snowflakes on click to feel premium and fast
    const initialSnowflakes: SnowflakeParticle[] = [];
    for (let i = 0; i < 14; i++) {
      initialSnowflakes.push(generateSnowflake(true));
    }
    setSnowflakes(initialSnowflakes);
    setBalloons([]); // Flush balloons screen cleanly

    // Set countdown start
    const durationMs = 5000;
    const startTimestamp = Date.now();
    setSecondsLeft(5.00);

    // Highly precise timeline timer loop updating state with sub-second values
    countdownIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const remaining = Math.max(0, (durationMs - elapsed) / 1000);
      setSecondsLeft(remaining);
      
      if (remaining <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      }
    }, 40);

    // Steady spawning loop adding 2 snowflakes every 200 milliseconds
    generatorIntervalRef.current = setInterval(() => {
      setSnowflakes((prev) => [...prev, generateSnowflake(false), generateSnowflake(false)]);
      if (soundEnabled && Math.random() > 0.65) {
        // Soft ambient chime occasionally during snowball cascade
        playSnowflakeSound();
      }
    }, 200);

    // Conclude active session after exactly 5.0 seconds
    timerEndTimeoutRef.current = setTimeout(() => {
      setActiveEffect('none');
      setSecondsLeft(null);
      if (generatorIntervalRef.current) {
        clearInterval(generatorIntervalRef.current);
        generatorIntervalRef.current = null;
      }
    }, durationMs);
  };

  // Spawn floaty Hot-Air Balloons
  const triggerBalloons = () => {
    // Clear any currently running animations or timers
    clearAllIntervals();
    setActiveEffect('balloons');

    // Play bubble pop sweep sound if enabled
    if (soundEnabled) {
      playBalloonSound();
    }

    // Spawn a lush immediate burst: 10 balloons on click to float instantly
    const initialBalloons: BalloonParticle[] = [];
    for (let i = 0; i < 10; i++) {
      initialBalloons.push(generateBalloon(true));
    }
    setBalloons(initialBalloons);
    setSnowflakes([]); // Flush snowflakes screen cleanly

    // Set countdown start
    const durationMs = 5000;
    const startTimestamp = Date.now();
    setSecondsLeft(5.00);

    // Precise sub-second timeline updating state
    countdownIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const remaining = Math.max(0, (durationMs - elapsed) / 1000);
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      }
    }, 40);

    // Steady, elegant lift spawning loop adding 1 balloon every 300 milliseconds
    generatorIntervalRef.current = setInterval(() => {
      setBalloons((prev) => [...prev, generateBalloon(false)]);
      if (soundEnabled && Math.random() > 0.5) {
        playBalloonSound();
      }
    }, 300);

    // Conclude generation after exactly 5.0 seconds
    timerEndTimeoutRef.current = setTimeout(() => {
      setActiveEffect('none');
      setSecondsLeft(null);
      if (generatorIntervalRef.current) {
        clearInterval(generatorIntervalRef.current);
        generatorIntervalRef.current = null;
      }
    }, durationMs);
  };

  // Instant Reset Space
  const clearAllEffects = () => {
    clearAllIntervals();
    setActiveEffect('none');
    setSecondsLeft(null);
    setSnowflakes([]);
    setBalloons([]);
  };

  // Safety cleanup on unmount
  useEffect(() => {
    return () => clearAllIntervals();
  }, []);

  const handleRemoveSnowflake = (id: string) => {
    setSnowflakes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveBalloon = (id: string) => {
    setBalloons((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between relative overflow-hidden antialiased select-none transition-colors duration-500 ease-in-out ${
      isDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-rose-500/30' 
        : 'bg-gradient-to-tr from-slate-50 via-slate-100 to-zinc-50 text-slate-800 selection:bg-sky-200'
    }`}>
      
      {/* Dynamic atmospheric ambient hue overlay when effects are active */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0 ${
          activeEffect === 'snowflakes' 
            ? 'bg-sky-400/5 opacity-100' 
            : activeEffect === 'balloons' 
              ? 'bg-rose-400/5 opacity-100' 
              : 'opacity-0'
        }`} 
      />

      {/* Corporate elegant background decorative grids */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-60 z-0 transition-all duration-500"
        style={{
          '--grid-color': isDark ? '#1e293b' : '#f1f5f9'
        } as React.CSSProperties}
      />

      {/* Top corporate navbar styling */}
      <header className={`w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b backdrop-blur-sm relative z-30 transition-colors duration-500 ${
        isDark ? 'border-slate-800/80' : 'border-slate-200/50'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-extrabold text-sm tracking-tight shadow-md transition-colors duration-500 ${
            isDark 
              ? 'bg-slate-100 text-slate-900 shadow-slate-100/5' 
              : 'bg-slate-900 text-white shadow-slate-900/15'
          }`}>
            SB
          </div>
          <div>
            <span className={`text-sm font-bold block leading-none transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              Snow & Balloons
            </span>
            <span className={`text-[10px] font-mono leading-none mt-1 block uppercase tracking-wider transition-colors duration-500 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Formal Simulator
            </span>
          </div>
        </div>
        
        {/* Subtle online status indicator and Dark mode switch */}
        <div className="flex items-center gap-4">
          <button
            id="theme-toggle-btn"
            onClick={() => setIsDark(!isDark)}
            className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-amber-400 hover:text-amber-300' 
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
            }`}
            title={isDark ? "Switch to Light Slate Theme" : "Switch to Dark Onyx Theme"}
          >
            {isDark ? (
              <>
                <Sun size={15} />
                <span className="text-[11px] font-mono font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} />
                <span className="text-[11px] font-mono font-medium">Dark Mode</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 text-xs font-mono select-none hidden sm:inline-block">SYSTEM CALIBRATED</span>
          </div>
        </div>
      </header>

      {/* Main dashboard view container */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 relative z-30">
        <Dashboard
          activeEffect={activeEffect}
          secondsLeft={secondsLeft}
          snowflakeCount={snowflakes.length}
          balloonCount={balloons.length}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          triggerSnowflakes={triggerSnowflakes}
          triggerBalloons={triggerBalloons}
          clearAllEffects={clearAllEffects}
          isDark={isDark}
        />
      </main>

      {/* Immersive Particle Canvas Layer */}
      <ParticleCanvas
        snowflakes={snowflakes}
        balloons={balloons}
        onRemoveSnowflake={handleRemoveSnowflake}
        onRemoveBalloon={handleRemoveBalloon}
      />

      {/* Footer credits and details */}
      <footer className={`w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t gap-2 relative z-30 opacity-70 transition-colors duration-500 ${
        isDark ? 'border-slate-900/60' : 'border-slate-100'
      }`}>
        <span className={`text-xs font-sans transition-colors duration-500 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          &copy; 2026 Atmospheric Particle Systems. All rights reserved.
        </span>
        <div className={`flex items-center gap-4 text-xs font-mono transition-colors duration-500 ${
          isDark ? 'text-slate-550' : 'text-slate-400'
        }`}>
          <span>Latent Physics Engine v2.4.0</span>
          <span>&bull;</span>
          <span>Inter &copy; Typeface</span>
        </div>
      </footer>
    </div>
  );
}
