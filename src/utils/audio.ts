// Web Audio Synthesizer for high-end micro-interactions
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a delicate icy crystalline bell chime
 */
export function playSnowflakeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Combine 3 harmonics to simulate crystalline ice resonance
  const freqs = [1400, 1850, 2400];
  const gains = [0.06, 0.04, 0.02];

  freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Add simple pitch decay
    osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.15);

    gainNode.gain.setValueAtTime(gains[index], now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25 + (index * 0.05));

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  });
}

/**
 * Synthesizes a springy balloon lift bubble pop sound, rubber squeak, or airy swoosh
 */
export function playBalloonSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Randomly select between 3 premium balloon-related sound signatures
  // to prevent repetitive listening fatigue
  const rand = Math.random();

  if (rand < 0.4) {
    // 1. CARTOONY RUBBER SQUEAK (High pitch quickly bending up and down)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    // Mimic rubbing rubber tension squeak
    osc.frequency.linearRampToValueAtTime(750, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.22);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } else if (rand < 0.75) {
    // 2. BOUNCY LIFT & FWUMP (Thick resonant double-harmonic sweep)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(120, now);
    osc1.frequency.exponentialRampToValueAtTime(260, now + 0.2);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(60, now);
    osc2.frequency.exponentialRampToValueAtTime(130, now + 0.2);

    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.linearRampToValueAtTime(0.05, now + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.23);
    osc2.stop(now + 0.23);
  } else {
    // 3. ELASTIC "PIP" VOICE (Very high squeaky rubber pop release)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    gainNode.gain.setValueAtTime(0.03, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }
}
