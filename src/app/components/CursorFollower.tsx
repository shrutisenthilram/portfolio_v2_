import { useEffect, useRef, useState } from "react";

const INDIGO = { r: 67, g: 56, b: 202 };
const CORAL  = { r: 249, g: 115, b: 22 };

function lerpColor(t: number) {
  const r = Math.round(INDIGO.r + (CORAL.r - INDIGO.r) * t);
  const g = Math.round(INDIGO.g + (CORAL.g - INDIGO.g) * t);
  const b = Math.round(INDIGO.b + (CORAL.b - INDIGO.b) * t);
  return `rgb(${r},${g},${b})`;
}

export function CursorFollower() {
  const posRef = useRef({ x: -200, y: -200 });
  const ringRef = useRef({ x: -200, y: -200 });
  const angleRef = useRef(0);
  const animRef = useRef<number>();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [color, setColor] = useState(`rgb(${INDIGO.r},${INDIGO.g},${INDIGO.b})`);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer + true hover
    // (excludes touch devices, including iPads & iPhones in Safari)
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: fine) and (hover: hover)");
    setIsFinePointer(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const style = document.createElement("style");
    style.innerHTML = `@media (pointer: fine) and (hover: hover) { *, *::before, *::after { cursor: none !important; } }`;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-hover]"));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const animate = () => {
      // Lag ring follows cursor
      ringRef.current = {
        x: ringRef.current.x + (posRef.current.x - ringRef.current.x) * 0.9,
        y: ringRef.current.y + (posRef.current.y - ringRef.current.y) * 0.9,
      };
      setRing({ x: ringRef.current.x, y: ringRef.current.y });

      // Oscillate color between indigo and coral (slow sine wave)
      angleRef.current = (angleRef.current + 0.8) % 360;
      const t = (Math.sin((angleRef.current * Math.PI) / 180) + 1) / 2;
      setColor(lerpColor(t));

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer || !visible) return null;

  const ringSize = hovering ? 44 : 28;

  return (
    <>
      {/* Lagging ring — oscillating color */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${color}`,
          backgroundColor: hovering ? color + "18" : "transparent",
          transform: `translate(${ring.x - ringSize / 2}px, ${ring.y - ringSize / 2}px)`,
          transition: "width 0.25s ease, height 0.25s ease, background-color 0.25s ease",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Sharp dot — oscillating color */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 5,
          height: 5,
          backgroundColor: color,
          transform: `translate(${pos.x - 2.5}px, ${pos.y - 2.5}px)`,
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}