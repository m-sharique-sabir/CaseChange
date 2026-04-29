import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailCount = 5;
  const trailPositions = useRef(
    Array.from({ length: trailCount }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleEnter = () => { visibleRef.current = true; setIsVisible(true); };
    const handleLeave = () => { visibleRef.current = false; setIsVisible(false); };
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleOver = (e) => {
      const el = e.target;
      if (
        el.tagName === 'BUTTON' || el.tagName === 'A' ||
        el.closest('button') || el.closest('a') ||
        el.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    let animId;
    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      // Ring follows with lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      // Trail particles
      for (let i = 0; i < trailCount; i++) {
        const target = i === 0 ? pos.current : trailPositions.current[i - 1];
        trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * (0.3 - i * 0.04);
        trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * (0.3 - i * 0.04);
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-9999 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Trail particles */}
      {Array.from({ length: trailCount }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: 6 - i,
            height: 6 - i,
            marginLeft: -(3 - i / 2),
            marginTop: -(3 - i / 2),
            background: `rgba(99, 102, 241, ${0.3 - i * 0.05})`,
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      ))}

      {/* Main dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          marginLeft: isClicking ? -3 : -4,
          marginTop: isClicking ? -3 : -4,
          background: isHovering
            ? 'radial-gradient(circle, rgba(99,102,241,0.9), rgba(139,92,246,0.7))'
            : 'radial-gradient(circle, rgba(99,102,241,0.6), rgba(139,92,246,0.4))',
          boxShadow: isHovering
            ? '0 0 12px rgba(99,102,241,0.6), 0 0 24px rgba(139,92,246,0.3)'
            : '0 0 8px rgba(99,102,241,0.3)',
          transition: 'width 0.15s, height 0.15s, margin 0.15s, background 0.2s, box-shadow 0.2s',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border-2"
        style={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          marginLeft: isHovering ? -24 : -18,
          marginTop: isHovering ? -24 : -18,
          borderColor: isHovering
            ? 'rgba(99,102,241,0.5)'
            : 'rgba(99,102,241,0.2)',
          background: isHovering
            ? 'rgba(99,102,241,0.06)'
            : 'transparent',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, margin 0.25s ease-out, border-color 0.25s, background 0.25s',
        }}
      />
    </div>
  );
};

export default CustomCursor;
