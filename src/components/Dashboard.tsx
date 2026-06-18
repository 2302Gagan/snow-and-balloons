import React from 'react';
import { 
  Snowflake as SnowflakeIcon, 
  Wind, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Activity, 
  Sliders, 
  Clock,
  Sparkles,
  ArrowUpCircle
} from 'lucide-react';
import { ActiveEffect } from '../types';

interface DashboardProps {
  activeEffect: ActiveEffect;
  secondsLeft: number | null;
  snowflakeCount: number;
  balloonCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  triggerSnowflakes: () => void;
  triggerBalloons: () => void;
  clearAllEffects: () => void;
  isDark: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeEffect,
  secondsLeft,
  snowflakeCount,
  balloonCount,
  soundEnabled,
  setSoundEnabled,
  triggerSnowflakes,
  triggerBalloons,
  clearAllEffects,
  isDark,
}) => {
  // Compute percentage of 5-second countdown for progress bar
  const progressPercent = secondsLeft !== null ? (secondsLeft / 5) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto z-10 animate-fade-in">
      {/* Simulation Dashboard Container */}
      <div 
        id="control-console" 
        className={`backdrop-blur-xl border transition-all duration-300 relative overflow-hidden rounded-3xl p-6 sm:p-8 ${
          isDark 
            ? 'bg-slate-900/85 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'bg-white/80 border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'
        }`}
      >
        {/* Ambient indicator lights on top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className={`h-full transition-all duration-500 flex-1 ${
            activeEffect === 'snowflakes' ? 'bg-sky-400' : activeEffect === 'balloons' ? 'bg-rose-400' : isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`} />
        </div>

        {/* Header section with brand and sound toggle */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-semibold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <Activity size={12} className={activeEffect !== 'none' ? (activeEffect === 'snowflakes' ? 'animate-pulse text-sky-400' : 'animate-pulse text-rose-400') : ''} />
              <span>Dynamics Laboratory System</span>
            </div>
            <h1 className={`text-2xl font-bold font-sans tracking-tight mt-1 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              Atmosphere Controller
            </h1>
          </div>

          {/* Controls: Audio Toggle and Clear Button */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Disable UI Chime synthesizer" : "Enable UI Chime synthesizer"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                soundEnabled 
                  ? (isDark 
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 shadow-sm' 
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 shadow-sm')
                  : (isDark
                      ? 'bg-slate-950 text-slate-500 border-slate-850 hover:text-slate-400 hover:bg-slate-900'
                      : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-500 hover:bg-slate-100')
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={14} className={isDark ? "text-slate-300" : "text-slate-600"} />
                  <span>Audio Synthesized</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} />
                  <span>Audio Muted</span>
                </>
              )}
            </button>

            {/* Clear All Button */}
            {(snowflakeCount > 0 || balloonCount > 0 || activeEffect !== 'none') && (
              <button
                id="clear-all-btn"
                onClick={clearAllEffects}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer animate-fade-in shadow-sm ${
                  isDark
                    ? 'text-rose-400 bg-rose-950/40 border border-rose-910 hover:bg-rose-900/45 hover:text-rose-300'
                    : 'text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 hover:text-rose-700'
                }`}
              >
                <Trash2 size={13} />
                <span>Reset Space</span>
              </button>
            )}
          </div>
        </div>

        {/* Realtime Status Display when simulation is active */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <Clock size={12} />
              <span>Cascade Timeline State</span>
            </span>
            <span className={`text-xs font-mono font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {secondsLeft !== null ? (
                <span className="flex items-center gap-1">
                  <span className={`tabular-nums font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>{secondsLeft.toFixed(2)}</span>s active
                </span>
              ) : (
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Environment Standby</span>
              )}
            </span>
          </div>

          {/* Modern visual progress bar */}
          <div className={`h-2.5 w-full rounded-full overflow-hidden border p-[1px] ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200/50'
          }`}>
            <div 
              style={{ width: `${secondsLeft !== null ? progressPercent : 0}%` }}
              className={`h-full rounded-full transition-all duration-75 ${
                activeEffect === 'snowflakes' 
                  ? 'bg-gradient-to-r from-sky-450 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]' 
                  : activeEffect === 'balloons' 
                    ? 'bg-gradient-to-r from-rose-450 to-pink-500 shadow-[0_0_8px_rgba(251,113,133,0.5)]' 
                    : 'bg-slate-300 w-0'
              }`}
            />
          </div>
        </div>

        {/* Primary Interactive triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Snowflakes Trigger Button */}
          <button
            id="snowflakes-trigger-btn"
            onClick={triggerSnowflakes}
            disabled={activeEffect === 'snowflakes'}
            className={`relative group flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer overflow-hidden ${
              activeEffect === 'snowflakes'
                ? (isDark 
                    ? 'bg-gradient-to-br from-sky-950/45 to-blue-950/30 border-sky-500 ring-2 ring-sky-500/20 shadow-md text-sky-200/90' 
                    : 'bg-gradient-to-br from-sky-50 to-blue-50/60 border-sky-300 ring-2 ring-sky-200/50 shadow-md')
                : (isDark
                    ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5')
            }`}
          >
            {/* Subtle background glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-sky-550/10 to-indigo-550/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10 w-full flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl transition-colors duration-300 ${
                activeEffect === 'snowflakes' 
                  ? 'bg-sky-500/20 text-sky-350' 
                  : (isDark ? 'bg-slate-900 text-slate-400 group-hover:bg-sky-950/40 group-hover:text-sky-400' : 'bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-500')
              }`}>
                <SnowflakeIcon size={22} className={activeEffect === 'snowflakes' ? 'animate-spin' : 'group-hover:rotate-45 transition-transform duration-500'} style={{ animationDuration: '6s' }} />
              </div>
              
              <div className="text-right">
                <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Medium-Sized</span>
                <span className="text-xs font-mono font-bold text-sky-500 mt-1 block">Snowfall</span>
              </div>
            </div>

            <div className="relative z-10">
              <h2 className={`text-lg font-bold font-sans tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Snowflakes</h2>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Trigger crystals drifting from top to bottom. Lasts 5.0 seconds.
              </p>
            </div>
            
            {activeEffect === 'snowflakes' && (
              <span className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            )}
          </button>

          {/* Balloons Trigger Button */}
          <button
            id="balloons-trigger-btn"
            onClick={triggerBalloons}
            disabled={activeEffect === 'balloons'}
            className={`relative group flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer overflow-hidden ${
              activeEffect === 'balloons'
                ? (isDark
                    ? 'bg-gradient-to-br from-rose-950/45 to-pink-950/30 border-rose-500 ring-2 ring-rose-500/20 shadow-md text-rose-200/90'
                    : 'bg-gradient-to-br from-rose-50 to-pink-50/60 border-rose-300 ring-2 ring-rose-200/50 shadow-md')
                : (isDark
                    ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5')
            }`}
          >
            {/* Subtle background glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-rose-550/10 to-pink-550/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10 w-full flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl transition-colors duration-300 ${
                activeEffect === 'balloons' 
                  ? 'bg-rose-500/20 text-rose-350' 
                  : (isDark ? 'bg-slate-900 text-slate-400 group-hover:bg-rose-950/40 group-hover:text-rose-400' : 'bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-500')
              }`}>
                <ArrowUpCircle size={22} className={activeEffect === 'balloons' ? 'animate-bounce' : 'group-hover:-translate-y-1 transition-transform duration-300'} />
              </div>
              
              <div className="text-right">
                <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Medium-Sized</span>
                <span className="text-xs font-mono font-bold text-rose-500 mt-1 block">Convection</span>
              </div>
            </div>

            <div className="relative z-10">
              <h2 className={`text-lg font-bold font-sans tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Balloons</h2>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Trigger standard spherical balloons rising from the bottom. Lasts 5.0 seconds.
              </p>
            </div>

            {activeEffect === 'balloons' && (
              <span className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Real-Time Parameter Telemetry Grid */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className={`flex items-center gap-1 text-xs font-mono uppercase tracking-wider mb-4 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Sliders size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
            <span>Interactive Telemetry Logs</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className={`rounded-xl p-3 border transition-colors duration-300 ${
              isDark ? 'bg-slate-950/65 border-slate-800/80' : 'bg-slate-50 border-slate-200/50'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Active Mode</span>
              <span className={`text-sm font-bold block mt-1 font-mono truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                {activeEffect === 'snowflakes' ? (
                  <span className="text-sky-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    Snowfall
                  </span>
                ) : activeEffect === 'balloons' ? (
                  <span className="text-rose-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                    Convection
                  </span>
                ) : (
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Idle Standby</span>
                )}
              </span>
            </div>

            {/* Metric 2 */}
            <div className={`rounded-xl p-3 border transition-colors duration-300 ${
              isDark ? 'bg-slate-950/65 border-slate-800/80' : 'bg-slate-50 border-slate-200/50'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Snowflakes Active</span>
              <span className={`text-sm font-bold block mt-1 font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                {snowflakeCount > 0 ? (
                  <span className="text-sky-400 text-md font-semibold">{snowflakeCount} units</span>
                ) : (
                  <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>0</span>
                )}
              </span>
            </div>

            {/* Metric 3 */}
            <div className={`rounded-xl p-3 border transition-colors duration-300 ${
              isDark ? 'bg-slate-950/65 border-slate-800/80' : 'bg-slate-50 border-slate-200/50'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Balloons Active</span>
              <span className={`text-sm font-bold block mt-1 font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                {balloonCount > 0 ? (
                  <span className="text-rose-400 text-md font-semibold">{balloonCount} units</span>
                ) : (
                  <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>0</span>
                )}
              </span>
            </div>

            {/* Metric 4 */}
            <div className={`rounded-xl p-3 border transition-colors duration-300 ${
              isDark ? 'bg-slate-950/65 border-slate-800/80' : 'bg-slate-50 border-slate-200/50'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Gravity & Force</span>
              <span className={`text-xs font-mono font-semibold block mt-1.5 leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {activeEffect === 'snowflakes' ? (
                  <span className="text-sky-400 flex items-center gap-1">
                    <Wind size={11} className="animate-bounce" />
                    0.28 g (Fall)
                  </span>
                ) : activeEffect === 'balloons' ? (
                  <span className="text-rose-400 flex items-center gap-1">
                    <Wind size={11} className="animate-bounce rotate-180" />
                    -0.35 g (Lift)
                  </span>
                ) : (
                  'Stable/Calibrated'
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Fine-print instructions */}
        <div className="mt-6 flex items-center gap-1.5 justify-center opacity-40 hover:opacity-100 transition-opacity duration-200">
          <Sparkles size={11} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
          <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Crafted for maximum visual compliance. Built with 100% vector render engines.
          </span>
        </div>
      </div>
    </div>
  );
};
