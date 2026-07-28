export const siteConfig = {
  name: "Sequoia Christian School",
  tagline: "Where Giant Dreamers Are Nurtured",
  address: "411 S. 40th St.\nHarrisburg, PA 17111",
  phone: "(717) 614-1263",
  social: {
    instagram: "https://www.instagram.com/sequoiachristianschool/",
    facebook: "https://www.facebook.com/sequoiachristianschool",
    youtube: "https://www.youtube.com/@sequoiachristian",
  },
  youtubeVideoId: "HbWrJ_cr5DQ",
  applyUrl: "https://seq-pa.client.renweb.com/oa/?memberid=17101",
  familyPortalUrl: "https://seq-pa.client.renweb.com/pwr/",
  employmentUrl: "/employment",
  financialAidUrl: "/tuition",
  lifeCenterUrl: "https://lcmi.org/",
  donateUrl:
    "https://pushpay.com/g/lifecenterministries?fnd=zYYFjhpsuhsCtke93J7-zA&lang=en&r=No&src=pcgl",
};

/** Routes with a full-viewport hero — header stays transparent until scrolled past */
export const pagesWithFullHero = ["/", "/welcome", "/educationalapproach"] as const;

export const statementOfFaith = [
  "We believe and teach the Holy Bible, God's only inspired, infallible, authoritative, written Word, to which nothing can be added or taken away.",
  "We believe that there is one triune God eternally manifested in the person of God the Father, God the Son, and God the Holy Spirit.",
  "We believe in Jesus Christ, God's only begotten Son, who was born of a virgin, lived a totally blameless life, died for our sins, rose victoriously over Satan, and now sits at the right hand of the Father until His imminent return.",
  "We believe and teach that the sinless life of our Savior Jesus Christ, His miracles, and His accessibility to all men, women, and children, reveal God's grace and love. We look forward to the promised return of our Savior in power and glory to reign on earth.",
  "We believe and teach that the bride of Christ, the Church, is empowered to carry out the Savior's Great Commission, and to preach the Gospel of Liberty, both internal and external, to all men and nations, and to bring His healing message of the unity of all believers.",
  "We believe in the bodily resurrection of both the saved and the lost: those who are saved unto the resurrection of life and those who are lost unto the resurrection of damnation.",
  "We believe and recognize the historic, biblical view on sexuality and marriage, specifically that Scripture teaches that a man and a woman were designed exclusively for each other sexually. Scripture offers no other sexual categories for human beings other than male and female (Genesis 1:28). By extension, we believe Scripture defines and history affirms that marriage is a legal bond only between a man and a woman. Any sexual or family arrangement outside of His created order is unbiblical.",
];

export const statementOfBeliefs = [
  "We believe that the Holy Bible is 100% the Word of God. The scriptures are infallible, inerrant, and the sole and final authority for all matters of faith and conduct.",
  "We believe in the eternal Godhead who has revealed Himself as the one God existing in three persons or manifestations, Father, Son, and Holy Spirit, distinguishable, but inseparable.",
  "We believe in the Lord Jesus Christ, the Savior of men, conceived of the Holy Spirit, born of the Virgin Mary, truly God and truly man.",
  "We believe Christ died for our sins, was buried and rose again on the third day, personally appearing to His disciples.",
  "We believe in the bodily ascension of Jesus to heaven, his exaltation, and personal, literal, and bodily coming again the second time for His church.",
  "We believe in the creation, test and fall of man as recorded in Genesis, his total depravity and inability to attain divine righteousness by his own efforts.",
  "We believe in the salvation of sinners by grace, through repentance and faith in the perfect and sufficient work of the cross of Calvary by which we obtain remission of sin and regeneration of our human spirits. Without this experience, referred to as being \"born again,\" we cannot experience God's salvation.",
  "We believe in water baptism by immersion in the Name of the eternal Godhead in obedience to the command of the Lord Jesus Christ.",
  "We believe in the baptism of the Holy Spirit, as a real experience at or subsequent to salvation with the normal scriptural evidence of speaking in tongues.",
  "We believe in the operation of the gifts of the Holy Spirit today as manifested in the early church.",
  "We believe in the spirit-filled life, a life of separation from the corrupt values and ethics of the surrounding culture, and a life of growth in holiness in the reverential fear of God as expressing the true Christian faith.",
  "We believe that the healing of the body by God's power was provided for in the atonement and is available today in its varied aspects as practiced in the early church.",
  "We believe in the Lord's table or communion for believers. We believe that this is more than just a memorial, that the Lord is present in a unique way when the bread and wine are shared in remembrance of His death. There is a release of grace or judgment upon those who partake.",
  "We believe in the reality and personality of the devil and eternal judgment in the lake of fire for the devil and his angels.",
  "We believe in eternal life and blessing in the presence of God for believers and eternal punishment for unbelievers.",
  "We believe that there is one true universal church made up of genuine believers composed of many local congregations.",
  "We believe that normal New Testament Christianity involves the regular meeting or assembling of the believers together for the purposes of worship, prayer, instruction in the Word of God, and fellowship.",
];

/** Returns the enrollment school year (e.g. "2026-2027"). Updates each February 1. */
export function getCurrentSchoolYear(date = new Date()): string {
  const year = date.getFullYear();
  const startYear = date.getMonth() < 1 ? year - 1 : year;
  return `${startYear}-${startYear + 1}`;
}

export type SchoolCalendarEvent = {
  dates: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
};

export type SchoolCalendarMonth = {
  name: string;
  events: SchoolCalendarEvent[];
};

/** Key dates for the 2026–2027 school year (from official school calendar PDF). */
export const schoolCalendar: SchoolCalendarMonth[] = [
  {
    name: "August 2026",
    events: [
      {
        dates: "August 21",
        title: "Meet the Teacher",
        description: "9AM–11AM.",
        startDate: "2026-08-21",
      },
      {
        dates: "August 24",
        title: "First Day of School",
        description: "Classes begin for the 2026–2027 school year.",
        startDate: "2026-08-24",
      },
    ],
  },
  {
    name: "September 2026",
    events: [
      {
        dates: "September 4–7",
        title: "No School — Labor Day",
        startDate: "2026-09-04",
        endDate: "2026-09-07",
      },
    ],
  },
  {
    name: "October 2026",
    events: [
      {
        dates: "October 9",
        title: "Professional Development",
        description: "No school for students.",
        startDate: "2026-10-09",
      },
      {
        dates: "October 12",
        title: "No School — Columbus Day",
        startDate: "2026-10-12",
      },
    ],
  },
  {
    name: "November 2026",
    events: [
      {
        dates: "November 5–6",
        title: "Parent/Teacher Conferences",
        description: "No school for students.",
        startDate: "2026-11-05",
        endDate: "2026-11-06",
      },
      {
        dates: "November 11",
        title: "Veterans Day Assembly",
        startDate: "2026-11-11",
      },
      {
        dates: "November 25–30",
        title: "Thanksgiving Break",
        description: "No school for students and staff.",
        startDate: "2026-11-25",
        endDate: "2026-11-30",
      },
    ],
  },
  {
    name: "December 2026",
    events: [
      {
        dates: "December 17",
        title: "Holiday Concert",
        description: "PreK–5th grade, 6PM.",
        startDate: "2026-12-17",
      },
      {
        dates: "December 21 – January 1",
        title: "Christmas Break",
        description: "No school for students and staff.",
        startDate: "2026-12-21",
        endDate: "2027-01-01",
      },
    ],
  },
  {
    name: "January 2027",
    events: [
      {
        dates: "January 18",
        title: "No School — Martin Luther King Jr. Day",
        startDate: "2027-01-18",
      },
    ],
  },
  {
    name: "February 2027",
    events: [
      {
        dates: "February 12",
        title: "Father/Daughter Dance",
        description: "7–9PM.",
        startDate: "2027-02-12",
      },
      {
        dates: "February 15–16",
        title: "No School — Presidents' Day",
        description: "No school for students and staff.",
        startDate: "2027-02-15",
        endDate: "2027-02-16",
      },
      {
        dates: "February 26",
        title: "No School",
        description: "No school for students and staff.",
        startDate: "2027-02-26",
      },
    ],
  },
  {
    name: "March 2027",
    events: [
      {
        dates: "March 6",
        title: "Donuts & Grownups",
        description: "Time: TBD.",
        startDate: "2027-03-06",
      },
      {
        dates: "March 26",
        title: "Professional Development",
        description: "No school for students.",
        startDate: "2027-03-26",
      },
      {
        dates: "March 22–26",
        title: "Spring Break",
        description: "No school for students and staff.",
        startDate: "2027-03-22",
        endDate: "2027-03-26",
      },
    ],
  },
  {
    name: "April 2027",
    events: [
      {
        dates: "April 8",
        title: "Open House",
        description: "6PM.",
        startDate: "2027-04-08",
      },
      {
        dates: "April 15",
        title: "Spring Concert",
        description: "6PM.",
        startDate: "2027-04-15",
      },
      {
        dates: "April 21",
        title: "Professional Development",
        description: "No school for students.",
        startDate: "2027-04-21",
      },
      {
        dates: "April 22–23",
        title: "No School",
        description: "No school for students and staff.",
        startDate: "2027-04-22",
        endDate: "2027-04-23",
      },
      {
        dates: "April 30",
        title: "Field Day",
        description: "12PM–3PM.",
        startDate: "2027-04-30",
      },
    ],
  },
  {
    name: "May 2027",
    events: [
      {
        dates: "May 7",
        title: "Mother's Day Tea",
        description: "1PM–3PM.",
        startDate: "2027-05-07",
      },
      {
        dates: "May 27",
        title: "Kindergarten Last Day & Graduation",
        description: "Graduation at 6PM.",
        startDate: "2027-05-27",
      },
      {
        dates: "May 28",
        title: "Last Day of School",
        description: "Half day — dismissal at 11:45AM.",
        startDate: "2027-05-28",
      },
    ],
  },
];

export const parentTestimonials = [
  {
    videoId: "6a-NPKcOw-Y",
    title: "Values and Environment",
    imageSrc: "/images/testimonials/values-environment.png",
    imageAlt: "Parent testimonial: The values and environment",
  },
  {
    videoId: "P87hngwm74I",
    title: "Appreciated & Valued",
    imageSrc: "/images/testimonials/appreciated-valued.png",
    imageAlt: "Parent testimonial: Appreciated and valued",
  },
  {
    videoId: "JAtIX94QPrQ",
    title: "The Uniqueness of Each Individual Child",
    imageSrc: "/images/testimonials/uniqueness.png",
    imageAlt: "Parent testimonial: The uniqueness of each individual child",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "#",
    children: [
      { label: "Welcome Letter", href: "/welcome" },
      { label: "Statement of Faith", href: "/statementoffaith" },
      { label: "Faculty", href: "/faculty" },
      { label: "Employment", href: "/employment" },
      { label: "EITC", href: "/eitc" },
    ],
  },
  {
    label: "Academics",
    href: "/educationalapproach",
  },
  {
    label: "Admissions",
    href: "#",
    children: [
      { label: "Explore", href: "/explore" },
      { label: "Tuition", href: "/tuition" },
      { label: "Enrollment Process", href: "/enrollment" },
      { label: "Apply", href: "/apply" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  {
    label: "Families",
    href: "#",
    children: [
      { label: "Calendar", href: "/calendar" },
      { label: "Form Library", href: "/formlibrary" },
      { label: "Family Portal", href: siteConfig.familyPortalUrl },
    ],
  },
];

export const faculty = [
  { name: "Mrs. Diroll", role: "Headmaster", image: "/images/faculty/diroll.png" },
  { name: "Mrs. Muniz", role: "Administrative Assistant", image: "/images/faculty/muniz.png" },
  { name: "Mrs. McCallum", role: "Admin & Security", image: "/images/faculty/mccallum.png" },
  { name: "Ms. Zeky", role: "Developing Officer" },
  { name: "Ms. Kramer", role: "School Nurse", image: "/images/faculty/kramer.png" },
  { name: "Ms. Shepler", role: "Preschool & PreK", image: "/images/faculty/shepler.png" },
  { name: "Mrs. Martin", role: "Kindergarten", image: "/images/faculty/martin.png" },
  { name: "Ms. Potteiger", role: "1st Grade" },
  { name: "Ms. Davida", role: "2nd Grade", image: "/images/faculty/davida.png" },
  { name: "Ms. Araiza", role: "3rd Grade", image: "/images/faculty/araiza.png" },
  { name: "Mrs. Burmeister", role: "4th & 5th Grade" },
  { name: "Mrs. Fuller", role: "Art Teacher" },
  { name: "Mrs. Alexander", role: "Music Teacher", image: "/images/faculty/alexander.png" },
  { name: "Ms. Latsha", role: "Home Ec / PE / STEM Teacher" },
  { name: "Mrs. Berio-Minter", role: "Teacher Aide", image: "/images/faculty/berio-minter.png" },
  { name: "Ms. Wyatt", role: "Teacher Aide" },
  { name: "Mrs. Killeen", role: "Teacher Aide" },
  { name: "Ms. Aguilar", role: "Teacher Aide" },
];

export const principleApproachSections = [
  {
    title: "AMERICAN BIBLICAL CLASSICAL MODEL",
    text: "The education method during America's Colonial and founding periods can be termed \"American Biblical Classical\" in that every aspect of learning was based on biblical truth, while at the same time drawing from the best of classical education.",
  },
  {
    title: "THE 4 R'S OF LEARNING",
    text: "To teach effectively, one must first learn. The Principle Approach method requires the teacher and student to research, reason, relate and record as they study a subject, producing a record of their own learning.",
  },
  {
    title: "DEVELOPMENT OF LIFELONG LEARNERS",
    text: "Because students \"learn how to learn\" through the methods of this approach, they become lifelong learners. Not dependent upon others for education, these students, if necessary, could teach themselves.",
  },
  {
    title: "THE TEACHER AS LIVING CURRICULUM AND DISCIPLER OF STUDENTS",
    text: "Most schools of education challenge their aspiring teachers to be a living curriculum in the classroom. Principle Approach methodology holds the greatest potential for realizing this goal, as the teacher models a love of learning.",
  },
  {
    title: "EMPHASIS ON WRITTEN AND ORAL COMMUNICATION",
    text: "Students are taught to communicate skillfully through written and oral communication at every grade level. Participation in public speaking opportunities are encouraged.",
  },
  {
    title: "PROVIDENTIAL VIEW OF HISTORY",
    text: "The Principle Approach emphasizes God's purposes in the lives of men and nations, identifying the events of history as well as their underlying causes. God is the ultimate Director and Disposer of all things.",
  },
  {
    title: "ASSESSMENT OF LEARNING",
    text: "The Principle Approach's tutorial emphasis uses a variety of formative and summative evaluation techniques aimed at identifying gaps and weak areas of understanding on the student's pathway of mastery.",
  },
  {
    title: "TEACHING BY PRINCIPLES",
    text: "The Principle Approach employs biblical principles to inform each school subject by giving context and meaning. Teachers and students approach a subject by first studying the Word of God and deducing principles.",
  },
  {
    title: "LEARNING A PHILOSOPHY OF GOVERNMENT",
    text: "Teaching students the art of Christian self-government is a major concern of every teacher in the Principle Approach classroom. Because of this emphasis on seeing government as first internal and causal, students learn self-discipline.",
  },
  {
    title: "USE OF WEBSTER'S 1828 DICTIONARY",
    text: "In the development of a biblical worldview it is essential to define words biblically and with precision. Noah Webster's masterful work is a tool for accomplishing this. His first American Dictionary of the English Language is a standard reference.",
  },
  {
    title: "DEVELOPMENT OF THE MASTER TEACHER",
    text: "With the Principle Approach, the distinctive role of the teacher as a master of his or her subject is emphasized. Beginning with the Bible, other primary sources, and the best secondary sources, teachers become scholars.",
  },
  {
    title: "CHRISTIAN CHARACTER DEVELOPMENT",
    text: "All programs have some kind of emphasis on the development of the child's character. The Principle Approach uniquely integrates character development with academic excellence through biblical principles.",
  },
  {
    title: "TUTORIAL APPROACH",
    text: "One of the greatest challenges of all educators is the number of individual lives with which they oversee. The Principle Approach maintains a tutorial emphasis that honors the individual student.",
  },
  {
    title: "BIBLICAL CURRICULUM",
    text: "The Bible itself is the primary source of all learning, and is taught in a systematic and age-appropriate way throughout the years, thus giving students a comprehensive understanding of the people, places, and principles of Scripture.",
  },
];

export const learningTools = [
  "The T Chart is used to compare and contrast internal and external aspects of a subject being studied.",
  "Key charts highlight significant issues that are being studied (e.g., key individual, key document, key institution, key event).",
  "Timelines offer a view of the whole of a subject as well as the individual parts and how they are interrelated.",
  "Sketching provides a creative way to record something that is being examined or viewed.",
  "Hands-on opportunities offer creative ways to analyze and synthesize ideas, allowing students to express their learning in unexpected, novel ways.",
  "Employment of the fine and performing areas in the learning process to enrich the soul.",
  "Special days culminate a unit of study in a way that highlights the individuality of the students and brings closure to a unit of study with celebration and joy for a job well done.",
];
