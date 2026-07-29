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
        While we are not actively hiring at this time, we welcome applications from individuals who
        are interested in joining our team. We review applications as positions become available and
        will reach out if a suitable opportunity arises.
      </p>

      <div className="mt-10">
        <EmployeeApplicationForm />
      </div>
    </article>
  );
}
