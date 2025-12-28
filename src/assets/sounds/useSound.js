export function useSound(src, volume = 0.5) {
  const audio = new Audio(src);
  audio.volume = volume;
  return () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };
}
