import type { Metadata } from "next";
import FormLibraryList from "@/components/FormLibraryList";
import { getFormLibraryCategories } from "@/lib/form-library-config";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Form Library",
};

export default function FormLibraryPage() {
  const categories = getFormLibraryCategories();

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">FORM LIBRARY</h2>

      <p className="type-body mx-auto mt-8 max-w-2xl text-center">
        Download enrollment and medication forms for Sequoia Christian School. Contact the school
        office at{" "}
        <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="text-teal underline">
          {siteConfig.phone}
        </a>{" "}
        if you need assistance locating a form.
      </p>

      <FormLibraryList categories={categories} />
    </article>
  );
}
