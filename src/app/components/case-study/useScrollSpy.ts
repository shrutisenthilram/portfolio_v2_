import { useEffect, useState } from "react";

// Returns the currently active section id based on which one is in view.
// Activates when a section enters the middle band of the viewport.
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visible = new Map<string, number>();

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          visible.set(e.target.id, e.intersectionRatio);
        } else {
          visible.delete(e.target.id);
        }
      });

      // pick the first visible section in document order
      const firstVisible = ids.find((id) => visible.has(id));
      if (firstVisible) {
        setActive(firstVisible);
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids.join("|")]);

  return active;
}
