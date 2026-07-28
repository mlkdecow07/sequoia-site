export type FormLibraryItem = {
  label: string;
  href: string;
  note?: string;
};

export type FormLibraryCategory = {
  title: string;
  items: FormLibraryItem[];
};

export function getFormLibraryCategories(): FormLibraryCategory[] {
  return [
    {
      title: "Enrollment Requirements",
      items: [
        {
          label: "Physical Exam Form",
          href: "/documents/forms/physical-exam-form.pdf",
        },
        {
          label: "Dental Exam Form",
          href: "/documents/forms/dental-exam-form.pdf",
        },
        {
          label: "Immunization Exemption Form",
          href: "/documents/forms/immunization-exemption-form.pdf",
        },
      ],
    },
    {
      title: "Medication Administration",
      items: [
        {
          label: "Medication Administration Form",
          href: "/documents/forms/medication-administration-form.pdf",
        },
        {
          label: "Allergy Action Plan",
          href: "/documents/forms/allergy-action-plan.pdf",
        },
        {
          label: "Asthma Action Plan",
          href: "/documents/forms/asthma-action-plan.pdf",
        },
      ],
    },
  ];
}
