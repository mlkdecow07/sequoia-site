import type { Metadata } from "next";
import TestimonialVideoGrid from "@/components/TestimonialVideoGrid";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">PARENT TESTIMONIALS</h2>
      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        Hear about the experiences of families from our school.
      </p>
      <TestimonialVideoGrid />
    </article>
  );
}
