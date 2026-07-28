import Image from "next/image";
import type { CoreValueIcon } from "@/lib/core-values-config";

const iconSrc: Record<CoreValueIcon, string> = {
  book: "/images/core-values/book.png",
  "three-circles": "/images/core-values/three-circles.png",
  "nested-arcs": "/images/core-values/nested-arcs.png",
  diamond: "/images/core-values/diamond.png",
  arc: "/images/core-values/arc.png",
  "overlapping-circles": "/images/core-values/overlapping-circles.png",
};

type CoreValueIconProps = {
  type: CoreValueIcon;
  className?: string;
};

/** Tint black transparent PNGs to brand teal #408482 */
const tealFilter =
  "brightness(0) saturate(100%) invert(47%) sepia(24%) saturate(748%) hue-rotate(131deg) brightness(93%) contrast(88%)";

export default function CoreValueIconSvg({
  type,
  className = "h-16 w-16",
}: CoreValueIconProps) {
  return (
    <Image
      src={iconSrc[type]}
      alt=""
      width={160}
      height={160}
      className={className}
      style={{ filter: tealFilter }}
      aria-hidden
    />
  );
}
