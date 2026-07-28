import type { Metadata } from "next";
import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";

export const metadata: Metadata = {
  title: "Employee Application",
};

export default function EmploymentPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">JOIN THE SEQUOIA CHRISTIAN SCHOOL TEAM!</h2>

      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        We&apos;re currently accepting applications for those with a desire to teach at Sequoia
        Christian.
      </p>

      <div className="mt-10">
        <EmployeeApplicationForm />
      </div>
    </article>
  );
}
