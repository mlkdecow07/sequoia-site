import Link from "next/link";
import type { FormLibraryCategory } from "@/lib/form-library-config";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isDocumentHref(href: string) {
  return href.startsWith("/documents/");
}

type FormLibraryLinkProps = {
  href: string;
  children: React.ReactNode;
};

function FormLibraryLink({ href, children }: FormLibraryLinkProps) {
  const className =
    "font-body text-sm leading-snug text-teal underline decoration-teal/30 underline-offset-2 transition hover:text-teal-dark hover:decoration-teal sm:text-base";

  if (isExternalHref(href) || isDocumentHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type FormLibraryListProps = {
  categories: FormLibraryCategory[];
};

export default function FormLibraryList({ categories }: FormLibraryListProps) {
  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-8">
      {categories.map((category) => (
        <section
          key={category.title}
          className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm"
        >
          <div className="border-b border-teal/10 bg-teal/5 px-5 py-4 sm:px-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-teal sm:text-base">
              {category.title}
            </h3>
          </div>
          <ul className="divide-y divide-teal/10 px-5 py-2 sm:px-6">
            {category.items.map((item) => (
              <li key={item.label} className="py-3">
                <FormLibraryLink href={item.href}>{item.label}</FormLibraryLink>
                {item.note ? (
                  <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
