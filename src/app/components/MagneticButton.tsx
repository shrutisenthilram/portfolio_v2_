import { useRef, useState } from "react";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  onClick,
  className = "",
  style = {},
  strength = 0.38,
  as: Tag = "button",
  href,
  onMouseEnter: externalMouseEnter,
  onMouseLeave: externalMouseLeave,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setHovered(true);
    externalMouseEnter?.(e as React.MouseEvent<HTMLElement>);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setHovered(false);
    setOffset({ x: 0, y: 0 });
    externalMouseLeave?.(e as React.MouseEvent<HTMLElement>);
  };

  const magneticStyle: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: hovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
    ...style,
  };

  if (Tag === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={magneticStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={className}
      style={magneticStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
