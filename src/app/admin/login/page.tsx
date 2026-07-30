import Link from "next/link";
import { signInWithPassword } from "@/app/admin/actions";
import { adminLoginFieldClassName } from "@/lib/admin-form-styles";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;
  const next = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <div className="mx-auto w-full min-w-0 max-w-md">
      <h1 className="font-heading text-3xl uppercase tracking-widest text-teal">
        Admin Login
      </h1>

      {error ? (
        <p
          className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <form action={signInWithPassword} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next} />
        <div className="min-w-0">
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={adminLoginFieldClassName}
          />
        </div>
        <div className="min-w-0">
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={adminLoginFieldClassName}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-teal px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-teal-dark"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/" className="text-teal underline-offset-2 hover:underline">
          Back to site
        </Link>
      </p>
    </div>
  );
}
