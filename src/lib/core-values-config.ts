export type CoreValueIcon =
  | "book"
  | "three-circles"
  | "nested-arcs"
  | "diamond"
  | "arc"
  | "overlapping-circles";

export type CoreValue = {
  title: string;
  lines: [string, string];
  icon: CoreValueIcon;
  text: string;
};

export const coreValues: CoreValue[] = [
  {
    title: "Impart Biblical Principles",
    lines: ["Impart Biblical", "Principles"],
    icon: "book",
    text: "We impart biblical principles, as the foundation of all our teaching, to raise disciples of Christ from a young age who are deeply rooted in the love of God.",
  },
  {
    title: "Partner With Families",
    lines: ["Partner With", "Families"],
    icon: "three-circles",
    text: "We partner with families in the education and formation of each child.",
  },
  {
    title: "Inspire Students As Image Bearers",
    lines: ["Inspire Students", "As Image Bearers"],
    icon: "nested-arcs",
    text: "We inspire students as image-bearers — designed by God with purpose.",
  },
  {
    title: "Build Creative Scholars",
    lines: ["Build Creative", "Scholars"],
    icon: "diamond",
    text: "We build creative scholars with a combination of skills, talent and creativity.",
  },
  {
    title: "Encourage Self-Government",
    lines: ["Encourage", "Self-Government"],
    icon: "arc",
    text: "We encourage self-government — teaching students to take responsibility and initiative, while submitting to God's authority.",
  },
  {
    title: "Prepare Servant Leaders",
    lines: ["Prepare Servant", "Leaders"],
    icon: "overlapping-circles",
    text: "And we prepare servant leaders, championing humility as a foundation in our students' lives.",
  },
];
