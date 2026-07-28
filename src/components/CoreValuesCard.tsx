import CoreValueIconSvg from "@/components/CoreValueIcon";
import { coreValues } from "@/lib/core-values-config";

export default function CoreValuesCard() {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-teal/20 bg-white shadow-md">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-3.5 text-center sm:px-6 sm:py-4">
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-teal sm:text-3xl">
          OUR CORE VALUES
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-px bg-teal/15">
        {coreValues.map((value) => (
          <div
            key={value.title}
            className="flex flex-col items-center bg-white px-2 py-5 text-center sm:px-4 sm:py-7 md:px-5 md:py-8"
          >
            <CoreValueIconSvg
              type={value.icon}
              className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14"
            />
            <h3 className="mt-2 font-heading text-[11px] leading-snug tracking-wide text-teal sm:mt-3 sm:text-sm md:text-lg">
              {value.lines[0]}
              <br />
              {value.lines[1]}
            </h3>
            <p className="type-body mt-2 text-center text-[9px] leading-snug sm:mt-3 sm:text-[11px] sm:leading-relaxed md:text-sm">
              {value.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
