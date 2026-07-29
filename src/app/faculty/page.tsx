import type { Metadata } from "next";
import Image from "next/image";
import { faculty } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Faculty",
};

export default function FacultyPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">INTRODUCING THE FACULTY</h2>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {faculty.map((member) => {
          const initial = member.name.replace(/^(Mrs\.|Ms\.|Miss)\s+/i, "").charAt(0);

          return (
            <div
              key={`${member.name}-${member.role}`}
              className="overflow-hidden rounded-lg bg-white/95 text-center shadow-sm"
            >
              <div className="relative aspect-square bg-teal/10">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 160px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-heading text-2xl text-teal/30 sm:text-3xl">{initial}</span>
                  </div>
                )}
              </div>
              <div className="px-2 py-2.5 sm:px-3 sm:py-3">
                <h4 className="font-heading text-sm tracking-wide text-gray-800 sm:text-base">
                  {member.name}
                </h4>
                <p className="mt-0.5 text-[11px] leading-snug text-teal sm:text-xs">{member.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
