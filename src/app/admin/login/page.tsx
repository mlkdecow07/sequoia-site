import Link from "next/link";
import { signInWithPassword } from "@/app/admin/actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;
  const next = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-heading text-3xl text-teal">Staff login</h1>
      <p className="mt-2 text-sm text-gray-600">
        Sign in to view contact messages and employment applications.
      </p>

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
        <div>
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
            className="w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
        </div>
        <div>
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
            className="w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-teal px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-teal-dark"
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
