// small WebAudio helper for correct / wrong / result sounds
const createCtx = () => {
  try { return new (window.AudioContext || window.webkitAudioContext)(); }
  catch (e) { return null; }
};

export function playCorrect() {
  const ctx = createCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.38);
  // close context shortly
  setTimeout(() => ctx.close().catch(()=>{}), 700);
}

export function playWrong() {
  const ctx = createCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
  setTimeout(() => ctx.close().catch(()=>{}), 600);
}

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