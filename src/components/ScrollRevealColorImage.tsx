"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ScrollRevealColorImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  containerClassName?: string;
  imageClassName?: string;
};

function getRevealProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  if (rect.height <= 0 || rect.width <= 0) return 0;

  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  const heightRatio = Math.max(0, Math.min(1, visibleHeight / rect.height));
  const widthRatio = Math.max(0, Math.min(1, visibleWidth / rect.width));
  const inViewFraction = Math.min(heightRatio, widthRatio);

  const fullyOnScreen = rect.top >= 0 && rect.bottom <= viewportHeight;
  if (fullyOnScreen) return 1;

  if (rect.height <= viewportHeight) {
    return inViewFraction;
  }

  const scrollThrough = Math.max(
    0,
    Math.min(1, (viewportHeight - rect.top) / (rect.height + viewportHeight)),
  );
  return Math.max(inViewFraction, scrollThrough);
}

export default function ScrollRevealColorImage({
  src,
  alt,
  sizes = "100vw",
  containerClassName,
  imageClassName = "object-cover",
}: ScrollRevealColorImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateVisibility = () => {
      setRevealProgress(getRevealProgress(element));
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const isFullyRevealed = revealProgress >= 0.98;
  const motionScale = reducedMotion ? 1 : 1.08 - revealProgress * 0.08;
  const motionY = reducedMotion ? 0 : (1 - revealProgress) * 28;
  const motionOpacity = reducedMotion ? 1 : 0.55 + revealProgress * 0.45;
  const useDrift = isFullyRevealed && !reducedMotion;

  return (
    <div ref={containerRef} className={containerClassName}>
      <div
        className={`absolute inset-0 ${useDrift ? "photo-reveal-drift" : ""}`}
        style={
          useDrift
            ? { opacity: 1 }
            : {
                transform: `translateY(${motionY}px) scale(${motionScale})`,
                transition: "transform 700ms ease-out, opacity 700ms ease-out",
                opacity: motionOpacity,
              }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`${imageClassName} transition-[filter] duration-700 ease-out`}
          style={{ filter: `grayscale(${1 - revealProgress})` }}
        />
      </div>
    </div>
  );
}
