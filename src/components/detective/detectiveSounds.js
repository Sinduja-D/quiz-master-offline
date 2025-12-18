// small WebAudio helper for correct / wrong / result sounds and ambient "investigation" loop

let sharedCtx = null;
let ambienceState = null;

const createCtx = () => {
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    return null;
  }
};

const getCtx = () => {
  if (!sharedCtx) sharedCtx = createCtx();
  return sharedCtx;
};

function safeCloseCtx(ctx) {
  if (!ctx) return;
  try { ctx.close().catch(()=>{}); } catch(e) {}
}

/* --- Correct: short ascending investigative arpeggio with subtle click --- */
export function playCorrect() {
  const ctx = createCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [620, 820, 1040];
  const totalDur = 0.36;

  freqs.forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = i === 0 ? "sine" : i === 1 ? "triangle" : "sine";
    o.frequency.setValueAtTime(f, now + i * 0.09);
    g.gain.setValueAtTime(0.0001, now + i * 0.09);
    g.gain.exponentialRampToValueAtTime(0.14, now + i * 0.09 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.14);
    o.connect(g); g.connect(ctx.destination);
    o.start(now + i * 0.09);
    o.stop(now + i * 0.09 + 0.18);
  });

  // quick click to emphasize answer
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "square";
  clickOsc.frequency.setValueAtTime(1800, now + 0.02);
  clickGain.gain.setValueAtTime(0.0001, now + 0.02);
  clickGain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
  clickOsc.connect(clickGain); clickGain.connect(ctx.destination);
  clickOsc.start(now + 0.02);
  clickOsc.stop(now + 0.09);

  setTimeout(() => ctx.close().catch(()=>{}), Math.ceil((totalDur + 0.2) * 1000));
}

/* --- Wrong: short descending minor/flattened interval + soft thud --- */
export function playWrong() {
  const ctx = createCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  // descending tones (slightly dissonant)
  const freqs = [420, 320, 260];
  freqs.forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = i === 0 ? "sawtooth" : "sine";
    o.frequency.setValueAtTime(f, now + i * 0.06);
    g.gain.setValueAtTime(0.0001, now + i * 0.06);
    g.gain.exponentialRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.16);
    o.connect(g); g.connect(ctx.destination);
    o.start(now + i * 0.06);
    o.stop(now + i * 0.06 + 0.22);
  });

  // low thud
  const thud = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(60, now + 0.08);
  thudGain.gain.setValueAtTime(0.0001, now + 0.08);
  thudGain.gain.exponentialRampToValueAtTime(0.14, now + 0.09);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  thud.connect(thudGain); thudGain.connect(ctx.destination);
  thud.start(now + 0.08);
  thud.stop(now + 0.28);

  setTimeout(() => ctx.close().catch(()=>{}), 600);
}

/* --- Result: celebratory triad (unchanged) --- */
export function playResult() {
  const ctx = createCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const freqs = [880, 1047, 1319];
  const duration = 0.22;
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(f, now + i * (duration * 0.9));
    gain.gain.setValueAtTime(0.0001, now + i * (duration * 0.9));
    gain.gain.exponentialRampToValueAtTime(0.18, now + i * (duration * 0.9) + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * (duration * 0.9) + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now + i * (duration * 0.9));
    osc.stop(now + i * (duration * 0.9) + duration + 0.02);
  });
  setTimeout(() => ctx.close().catch(()=>{}), 1200);
}

/* --- Ambience: investigation feel while taking quiz --- */
/* startInvestigationAmbience() creates a subtle low drone + soft periodic "scan" ping loop.
   stopInvestigationAmbience() stops and frees audio resources. */
export function startInvestigationAmbience() {
  if (ambienceState) return; // already running
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const lowOsc = ctx.createOscillator();
  const lowGain = ctx.createGain();
  lowOsc.type = "sine";
  lowOsc.frequency.setValueAtTime(48, now); // low drone
  lowGain.gain.setValueAtTime(0.01, now);
  lowOsc.connect(lowGain);
  lowGain.connect(ctx.destination);
  lowOsc.start();

  const pulseOsc = ctx.createOscillator();
  const pulseGain = ctx.createGain();
  pulseOsc.type = "sine";
  pulseOsc.frequency.setValueAtTime(440, now);
  pulseGain.gain.setValueAtTime(0.0001, now);
  pulseOsc.connect(pulseGain);
  pulseGain.connect(ctx.destination);
  pulseOsc.start();

  // periodic soft "scan" pulses
  const intervalId = setInterval(() => {
    const t = ctx.currentTime;
    pulseGain.gain.cancelScheduledValues(t);
    pulseGain.gain.setValueAtTime(0.0001, t);
    pulseGain.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
    pulseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  }, 1200 + Math.random() * 600);

  ambienceState = { ctx, lowOsc, lowGain, pulseOsc, pulseGain, intervalId };
}

/* stop the ambience and close shared ctx */
export function stopInvestigationAmbience() {
  if (!ambienceState) return;
  try {
    clearInterval(ambienceState.intervalId);
    const { ctx, lowOsc, pulseOsc } = ambienceState;
    try { lowOsc.stop(); } catch {}
    try { pulseOsc.stop(); } catch {}
    // give short time for sounds to finish then close context
    setTimeout(() => {
      safeCloseCtx(ctx);
      // if we closed the shared context, clear reference so future sounds recreate it
      if (ctx === sharedCtx) sharedCtx = null;
    }, 200);
  } catch (e) { /* ignore */ }
  ambienceState = null;
}