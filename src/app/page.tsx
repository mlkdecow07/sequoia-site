import HeroGallery from "@/components/HeroGallery";
import HomeHighlightSlider from "@/components/HomeHighlightSlider";
import CoreValuesCard from "@/components/CoreValuesCard";
import CoreValuesNarrative from "@/components/CoreValuesNarrative";

const pillars = [
  {
    title: "LIFE-LONG LEARNING",
    text: "Life-long learning is a form of self-initiated education that is focused on personal development. Every student has an innate capacity for learning, and we recognize that children have a natural drive to explore, learn and grow. Our desire is to cultivate our students' abilities by encouraging the self-motivated pursuit of knowledge. Learning is more than accumulating facts – it is developing innovative, critical thinking skills and the ability to create solutions.",
  },
  {
    title: "GODLY CHARACTER",
    text: "The highest standard of character is set forth in Scripture and exemplified in Jesus Christ. We aspire to build in our students a desire to trust God, exemplify Christ and walk out a life of godly character. We exhort our students to attain moral excellence through a life of obedience and resisting the evil influences that surround us and arise from within us. The Bible and biblical principles are foundational at Sequoia Christian School.",
  },
  {
    title: "ENVIRONMENT FOR GROWTH",
    text: "Sequoia Christian School commits to providing a safe environment for students to explore life, identity and their God-breathed creative potential. These formative years are sacred, and these tender hearts deserve the best because THEY are our future!",
  },
];

const uniqueSections = [
  {
    title: "SEEDS OF POTENTIAL",
    text: "The magnificent sequoia tree, the largest in the world, grows from seeds actually given life by fire. The cones remain in the tree – sometimes for years – but when fire comes the heat opens the cones, releasing the tiny seeds. This process is a beautiful picture of our desire for every student.",
  },
  {
    title: "A SENSE OF WONDER",
    text: "Education should produce a sense of wonder. We recognize that the children entrusted to our care – like seeds – carry individual blueprints and learn in different ways. We are committed to providing curriculum and instruction which inspire students to dig deeply into specific subjects and interests.",
  },
  {
    title: "THE PRINCIPLE APPROACH",
    text: "Here at the Sequoia Christian School, we apply the Principle Approach in the development of our methods and content. We believe this philosophy serves our vision for students to learn, grow and thrive. In addition, we are committed to challenging their relationship with the Lord, discipling with biblical principles and allowing the Holy Spirit to move.",
  },
];

const sectionImages = {
  whyChristianEducation: {
    src: "/images/section-learning.jpg",
    alt: "Students engaged in learning at Sequoia Christian School",
  },
  whatMakesUsUnique: {
    src: "/images/section-character.jpg",
    alt: "Students building godly character at Sequoia Christian School",
  },
  aroundHereWeProvide: {
    src: "/images/hero-student.jpg",
    alt: "Student thriving in a nurturing school environment",
  },
};

const providesIntro =
  "The purpose and environment of Sequoia Christian School has been birthed from a place of prayer. We want every aspect of our children's development and education to be inspired by God. Here are a few of our most immediate desires:";

const provides = [
  { title: "QUALITY BIBLICAL EDUCATION", icon: "biblical" as const },
  { title: "INSPIRING & CREATIVE CURRICULUM", icon: "curriculum" as const },
  { title: "DEDICATED & COMMITTED TEACHERS", icon: "teachers" as const },
  { title: "A THRIVING ENVIRONMENT FOR GROWTH", icon: "environment" as const },
  { title: "INSPIRATION FOR THE DREAMERS OF TOMORROW", icon: "dreamers" as const },
];

const highlightSlides = [
  {
    id: "why-christian-education",
    title: "WHY CHRISTIAN EDUCATION?",
    image: sectionImages.whyChristianEducation,
    variant: "list" as const,
    items: pillars,
  },
  {
    id: "what-makes-us-unique",
    title: "WHAT MAKES US UNIQUE?",
    image: sectionImages.whatMakesUsUnique,
    variant: "list" as const,
    items: uniqueSections,
  },
  {
    id: "around-here-we-provide",
    title: "WHAT IS OUR VISION?",
    image: sectionImages.aroundHereWeProvide,
    variant: "provides" as const,
    intro: providesIntro,
    provides,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroGallery />

      <div className="relative z-10 bg-cream">
        <section className="mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-20">
          <div className="mb-10 sm:mb-12">
            <CoreValuesNarrative part="intro" />
          </div>
          <div className="mb-10 sm:mb-12">
            <CoreValuesNarrative part="mid" />
          </div>
          <CoreValuesCard />
        </section>
        <div className="mt-12 sm:mt-14">
          <CoreValuesNarrative part="rest" />
        </div>
        <HomeHighlightSlider slides={highlightSlides} />
      </div>
    </>
  );
}
