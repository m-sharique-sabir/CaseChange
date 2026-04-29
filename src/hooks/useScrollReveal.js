import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', delay = 0 } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return [ref, isVisible];
};

export const revealClass = (isVisible, direction = 'up') => {
  if (isVisible) {
    return `reveal-${direction}`;
  }
  return 'reveal-hidden';
};
