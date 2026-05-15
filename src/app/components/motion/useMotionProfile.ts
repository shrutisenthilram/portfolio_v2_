import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useMotionProfile() {
  const reduced = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isMobileLike, setIsMobileLike] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const fineMql = window.matchMedia("(pointer: fine) and (hover: hover)");
    const mobileMql = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setIsFinePointer(fineMql.matches);
      setIsMobileLike(mobileMql.matches || !fineMql.matches);
    };

    update();

    const onFine = () => update();
    const onMobile = () => update();

    if (fineMql.addEventListener) {
      fineMql.addEventListener("change", onFine);
      mobileMql.addEventListener("change", onMobile);
      return () => {
        fineMql.removeEventListener("change", onFine);
        mobileMql.removeEventListener("change", onMobile);
      };
    }

    fineMql.addListener(onFine);
    mobileMql.addListener(onMobile);
    return () => {
      fineMql.removeListener(onFine);
      mobileMql.removeListener(onMobile);
    };
  }, []);

  const intensityScale = useMemo(() => {
    if (reduced) return 0;
    if (isMobileLike) return 0.35;
    return 1;
  }, [reduced, isMobileLike]);

  return {
    prefersReducedMotion: Boolean(reduced),
    isFinePointer,
    isMobileLike,
    intensityScale,
    allowParallax: Boolean(isFinePointer && !reduced),
    allowFloat: !reduced,
  };
}
