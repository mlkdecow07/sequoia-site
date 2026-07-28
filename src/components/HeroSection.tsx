import Image from "next/image";
import { HERO_HEIGHT_CLASS, HERO_SCROLL_END_SELECTOR } from "@/lib/hero-config";

export { HERO_HEIGHT_CLASS, HERO_SCROLL_END_SELECTOR };

export type HeroImage = {
  src: string;
  alt: string;
  /** CSS object-position value, e.g. "center", "bottom", "top" */
  objectPosition?: string;
};

type HeroSectionProps = {
  images: HeroImage[];
  children: React.ReactNode;
  overlayClassName?: string;
  /** On mobile, repeat a single image in three rows with top/bottom in grayscale */
  mobileTripleGrayscale?: boolean;
  /** Extra content pinned to the center panel on desktop (3-image heroes) */
  centerPanelContent?: React.ReactNode;
  /** Stack multiple images vertically instead of side-by-side columns */
  stackImages?: boolean;
};

type HeroImagePanelProps = {
  image: HeroImage;
  sizes: string;
  grayscale?: boolean;
  animationDelay?: string;
};

function HeroImagePanel({ image, sizes, grayscale = false, animationDelay }: HeroImagePanelProps) {
  return (
    <div
      className={`relative min-h-0 h-full w-full overflow-hidden ${grayscale ? "grayscale" : ""}`}
    >
      <div
        className="hero-ken-burns absolute inset-0"
        style={animationDelay ? { animationDelay } : undefined}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          style={
            image.objectPosition ? { objectPosition: image.objectPosition } : undefined
          }
          priority
          sizes={sizes}
        />
      </div>
    </div>
  );
}

export default function HeroSection({
  images,
  children,
  overlayClassName = "bg-black/25",
  mobileTripleGrayscale = false,
  centerPanelContent,
  stackImages = false,
}: HeroSectionProps) {
  const singleImage = images.length === 1 ? images[0] : null;
  const useTripleMobile = mobileTripleGrayscale && singleImage !== null;
  const useStackedImages = stackImages && images.length > 1;

  return (
    <>
      <div
        className={`${HERO_HEIGHT_CLASS} pointer-events-none`}
        data-hero-scroll-end
        aria-hidden="true"
      />

      <section className={`fixed inset-x-0 top-0 z-0 overflow-hidden ${HERO_HEIGHT_CLASS}`}>
        {useTripleMobile ? (
          <>
            <div className="grid h-full grid-rows-[1fr_2fr_1fr] md:hidden">
              {[true, false, true].map((grayscale, index) => (
                <HeroImagePanel
                  key={index}
                  image={singleImage}
                  sizes="100vw"
                  grayscale={grayscale}
                  animationDelay={`${index * -3}s`}
                />
              ))}
            </div>
            <div className="relative hidden h-full w-full overflow-hidden md:block">
              <div className="hero-ken-burns absolute inset-0">
                <Image
                  src={singleImage.src}
                  alt={singleImage.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          </>
        ) : (
          <div
            className={
              images.length === 1
                ? "relative h-full w-full overflow-hidden"
                : useStackedImages
                  ? "grid h-full grid-cols-1 grid-rows-[1fr_2fr_1fr]"
                  : "grid h-full grid-cols-1 grid-rows-3 md:grid-cols-[1fr_2fr_1fr] md:grid-rows-1"
            }
          >
            {images.map((image, index) => (
              <HeroImagePanel
                key={image.src}
                image={image}
                sizes="100vw"
                animationDelay={`${index * -4}s`}
              />
            ))}
          </div>
        )}

        <div className={`absolute inset-0 ${overlayClassName}`} />

        {useTripleMobile ? (
          <>
            <div className="absolute inset-0 grid h-full grid-rows-[1fr_2fr_1fr] md:hidden">
              <div aria-hidden="true" />
              <div className="hero-content relative flex min-h-0 flex-col items-center justify-center gap-4 px-3 pb-3">
                {children}
              </div>
              <div aria-hidden="true" />
            </div>
            <div className="absolute inset-0 hidden flex-col md:flex">
              <div className="h-[6.25rem] shrink-0 sm:h-[6.875rem] md:h-[7.5rem]" aria-hidden="true" />
              <div className="hero-content flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-6 md:gap-5">
                {children}
              </div>
            </div>
          </>
        ) : useStackedImages ? (
          <div className="absolute inset-0 grid h-full grid-rows-[1fr_2fr_1fr]">
            <div aria-hidden="true" />
            <div className="hero-content relative flex min-h-0 flex-col items-center justify-center gap-4 px-3 pb-3 sm:px-6">
              {children}
            </div>
            <div aria-hidden="true" />
          </div>
        ) : images.length === 3 ? (
          <>
            <div className="absolute inset-0 grid h-full grid-cols-1 grid-rows-3 md:hidden">
              <div aria-hidden="true" />
              <div className="hero-content relative flex min-h-0 flex-col items-center justify-center gap-4 px-3 pb-3">
                {children}
                {centerPanelContent}
              </div>
              <div aria-hidden="true" />
            </div>
            <div className="absolute inset-0 hidden flex-col md:flex">
              <div className="h-[6.25rem] shrink-0 sm:h-[6.875rem] md:h-[7.5rem]" aria-hidden="true" />
              <div className="hero-content flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-6 md:gap-5">
                {children}
              </div>
            </div>
            {centerPanelContent ? (
              <div className="pointer-events-none absolute inset-0 hidden md:grid md:grid-cols-[1fr_2fr_1fr] md:grid-rows-1">
                <div aria-hidden="true" />
                <div className="hero-content flex flex-col items-center justify-end px-4 pb-8 lg:px-6">
                  {centerPanelContent}
                </div>
                <div aria-hidden="true" />
              </div>
            ) : null}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col">
            <div className="h-[6.25rem] shrink-0 sm:h-[6.875rem] md:h-[7.5rem]" aria-hidden="true" />
            <div className="hero-content flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-6 md:gap-5">
              {children}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
