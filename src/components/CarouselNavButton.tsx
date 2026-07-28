type CarouselNavButtonProps = {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label?: string;
};

export default function CarouselNavButton({
  direction,
  disabled,
  onClick,
  label,
}: CarouselNavButtonProps) {
  const defaultLabel = direction === "prev" ? "Previous" : "Next";

  return (
    <button
      type="button"
      aria-label={label ?? defaultLabel}
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/25 bg-white text-teal transition hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        {direction === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}
