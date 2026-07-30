import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/app/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream/95 text-gray-800">
      {user ? <AdminNav email={user.email} /> : null}
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
