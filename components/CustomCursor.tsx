"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animFrame = requestAnimationFrame(animateRing);
    };

    const onMouseEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(255,255,255,0.8)";
      dot.style.opacity = "0";
    };

    const onMouseLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "rgba(255,255,255,0.4)";
      dot.style.opacity = "1";
    };

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    document.addEventListener("mousemove", onMouseMove);
    animFrame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          marginLeft: "-14px",
          marginTop: "-14px",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}