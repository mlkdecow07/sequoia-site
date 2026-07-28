export const maritalStatusOptions = [
  "Single",
  "Married",
  "Divorced",
  "Separated",
  "Widowed",
] as const;

export const positionOptions = [
  "Long Term Substitute Teacher",
  "Short Term Substitute Teacher",
] as const;

export const agreementStatements = [
  "I understand that Sequoia Christian School does not discriminate in its employment practices against any person because of race, color, national or ethnic origin, biological gender, age, or qualifying disability.",
  "I hereby certify that the facts set forth in this application process are true and complete to the best of my knowledge.",
  "I understand that falsification of any statement or a significant omission of fact may prevent me from being hired, or if hired, may subject me to immediate dismissal regardless of the time elapsed before discovery. If I am released under these circumstances, I further understand and agree that I will be paid and receive benefits only through the day of release.",
  "I authorize references and my former employers to disclose to the school any and all employment records, performance reviews, letters, reports, and other information related to my life and employment, without giving me prior notice of such disclosure. In addition, I hereby release the school, my former employers, references, and all other parties from any and all claims, demands, or liabilities arising from or in any way related to such investigation or disclosure. I waive the right to ever personally view any references given to the school.",
  "I authorize the school to conduct both a criminal and a CPS/Social Services registry records check. I understand and agree that any offer or employment that I may receive from the school is conditioned upon the school's receipt of criminal background and CPS/Social Services registry information. The school may refuse employment or terminate conditional employment if the school deems any background information unfavorable or to adversely reflect upon Sequoia Christian School.",
  "I agree that a photocopy or facsimile copy of this document and any signature shall be considered for all purposes as the original signed release on file.",
  "I certify that I have carefully read and do understand the above statements. I understand that this is only an application for employment and that no employment contract is being offered at this time. I certify that I have carefully read and do understand the above statements.",
] as const;

export const backgroundQuestions = [
  "Have you ever been convicted of any felony?",
  "Have you ever been convicted of any crime involving moral turpitude (lying, cheating, and stealing)?",
  "Have you ever been convicted of any offense involving sexual molestation, physical or sexual abuse, or rape of a child?",
  "Have you ever been the subject of a founded case of child abuse and/or neglect by a Department of Social Services/Child Protective Services Unit?",
  "Are you the subject of any PENDING charges for a criminal offense?",
  "Has your driver's license ever been suspended or revoked?",
  "Other than the above, are there any facts or circumstances involving you or your background that would call into question your being entrusted with the supervision, guidance, and care of children or youths?",
] as const;

export type EmploymentRecord = {
  employerName: string;
  position: string;
  lengthOfEmployment: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  supervisorName: string;
  supervisorEmail: string;
  supervisorPhone: string;
  beginningSalary: string;
  endingSalary: string;
  reasonForLeaving: string;
};

export type EmployeeApplicationData = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  maritalStatus: string;
  position: string;
  heardAbout: string;
  relatedToEmployee: "" | "yes" | "no";
  relationDetails: string;
  authorizedToWork: "" | "yes" | "no";
  over18: "" | "yes" | "no";
  currentlyEmployed: "" | "yes" | "no";
  contactCurrentEmployer: "" | "yes" | "no";
  availableDate: string;
  dismissedFromPosition: "" | "yes" | "no";
  dismissalExplanation: string;
  activitiesSports: string;
  christianTestimony: string;
  churchMember: "" | "yes" | "no";
  churchName: string;
  churchYears: string;
  highSchool: string;
  hasDiploma: "" | "yes" | "no";
  postSecondary: string;
  hasAcsiCert: "" | "yes" | "no";
  acsiDetails: string;
  hasStateCert: "" | "yes" | "no";
  stateCertState: string;
  stateCertExpiration: string;
  employmentHistory: [EmploymentRecord, EmploymentRecord, EmploymentRecord];
  backgroundAnswers: Array<"" | "yes" | "no">;
  backgroundExplanation: string;
  agreementAccepted: boolean;
  signatureName: string;
  signatureDate: string;
  signature: string;
};

export const emptyEmploymentRecord = (): EmploymentRecord => ({
  employerName: "",
  position: "",
  lengthOfEmployment: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  supervisorName: "",
  supervisorEmail: "",
  supervisorPhone: "",
  beginningSalary: "",
  endingSalary: "",
  reasonForLeaving: "",
});

export const initialApplicationData: EmployeeApplicationData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  maritalStatus: "",
  position: "",
  heardAbout: "",
  relatedToEmployee: "",
  relationDetails: "",
  authorizedToWork: "",
  over18: "",
  currentlyEmployed: "",
  contactCurrentEmployer: "",
  availableDate: "",
  dismissedFromPosition: "",
  dismissalExplanation: "",
  activitiesSports: "",
  christianTestimony: "",
  churchMember: "",
  churchName: "",
  churchYears: "",
  highSchool: "",
  hasDiploma: "",
  postSecondary: "",
  hasAcsiCert: "",
  acsiDetails: "",
  hasStateCert: "",
  stateCertState: "",
  stateCertExpiration: "",
  employmentHistory: [
    emptyEmploymentRecord(),
    emptyEmploymentRecord(),
    emptyEmploymentRecord(),
  ],
  backgroundAnswers: backgroundQuestions.map(() => "" as const),
  backgroundExplanation: "",
  agreementAccepted: false,
  signatureName: "",
  signatureDate: "",
  signature: "",
};

export const formSteps = [
  { id: "personal", title: "Personal Information" },
  { id: "eligibility", title: "Eligibility" },
  { id: "activities", title: "Activities & Headshot" },
  { id: "christian", title: "Christian Background" },
  { id: "education", title: "Education & Qualifications" },
  { id: "employment1", title: "Employment History (Most Recent)" },
  { id: "employment2", title: "Additional Employment" },
  { id: "background", title: "Background Information" },
  { id: "agreement", title: "Certification & Agreement" },
] as const;
