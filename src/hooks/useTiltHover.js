import { useCallback, useRef } from 'react';

export const useTiltHover = (maxTilt = 4, scale = 1.02, glare = true) => {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`;

    if (glare) {
      const glareEl = el.querySelector('.tilt-glare');
      if (glareEl) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        glareEl.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.18), transparent 60%)`;
        glareEl.style.opacity = '1';
      }
    }
  }, [maxTilt, scale, glare]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s ease-out';
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glareEl = el.querySelector('.tilt-glare');
    if (glareEl) glareEl.style.opacity = '0';
  }, []);

  return { ref, handleMove, handleLeave };
};
