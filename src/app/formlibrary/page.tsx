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

      <div className="mx-auto mt-8 max-w-3xl">
        <p className="type-body text-center">Download enrollment and medication forms.</p>

        <FormLibraryList categories={categories} />

        <p className="mt-12 text-center text-[10px] tracking-wide text-gray-400 sm:text-xs">
          Contact the school office at{" "}
          <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="text-teal underline">
            {siteConfig.phone}
          </a>{" "}
          if you need assistance locating a form.
        </p>
      </div>
    </article>
  );
}
