/**
 * Single Types
 */

export interface Attachment {
  id: number;
  name: string;
  url: string;
  // replace string by enum?
  // type: string
  type: AttachmentType;
}

export interface Company {
  id: number;
  name: string;
  teaserImage: string;
  // Relations
  interns: Intern[];
}

export interface Course {
  id: number;
  name: string;
  description: string;
  term: number;
  academicYear: string;
  tags: string[];
  // Relations
  learningLineId: number;
  specialisationId: number;
  learningLine: LearningLine;
  specialisation: Specialisation;
  teachers: Person[];
}

export interface FieldExperience {
  id: string;
  duration: string;
  company: string;
  function: string;
  description: string;
  // Relations
  personId: number;
  person: Person;
}

// export interface Generation {
//   id: number;
//   name: string;
//   years: string;
// }

export interface Intern {
  id: number;
  function: string;
  description: string;
  // check if best number or string
  year: string;
  // Relations
  studentId: number;
  companyId: number;
  student: Person;
  company: Company;
}

export interface LearningLine {
  id: number;
  name: string;
  color: string;
}

// export interface LearningLineData {
//   count: number
//   data: LearningLine[]
// }

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  // enum student, person?
  avatarUrl: string;
  type: string;
  academicYear: string;
  // Relations
  // generationId: number;
  // generation: Generation;
}

export interface PersonInformation {
  id: number;
  quote: string;
  bio: string;
  dob: string;
  // Relations
  personId: number;
  person: Person;
}

export interface Project {
  id: number;
  name: string;
  teaserText: string;
  body: string;
  academicYear: string;
  teaserImage: string;
  tags: string[];
  // Relations
  courseId: number;
  course: Course;
  students: Person[];
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  // Relations
  personId: number;
  person: Person;
}

export interface Specialisation {
  id: number;
  name: string;
  academicYear: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  // enum?
  // role: string
  role: Role;
}

/**
 * Enums
 */
export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  LINEADMIN = "LINEADMIN",
}

export enum PersonType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export enum AttachmentType {
  SCREENSHOT = "SCREENSHOT",
  MOODBOARD = "MOODBOARD",
  IDEABOARD = "IDEABOARD",
  SCREENCAST = "SCREENCAST",
  CODESNIPPET = "CODESNIPPET",

  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",

  OTHER = "OTHER",
}

/**
 * GraphQL returns
 */
export interface LearningLinesData {
  learningLines: LearningLine[];
}

/**
 * Client
 */

export interface AllQuotes {
  id: number;
  firstName: string;
  lastName: string;
  personInformation: {
    quote: string;
  };
}

export interface AllTeachersClient {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;

  personInformation: {
    bio: string;
    socialMedias: SocialMedia[];
  };
}

export interface GetOneTeacherClient {
  quote: string;
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;

  courses: Course[];

  personInformation: {
    bio: string;
    socialMedias: SocialMedia[];
    fieldExperiences: FieldExperience[];
    quote: string;
  };
}

export interface CourseByLearningLineId {
  id: number;
  name: string;
  description: string;
  term: number;
  academicYear: string;
  tags: string[];
  // Relations
  learningLineId: number;
  specialisationId: number;
  learningLine: LearningLine;
  specialisation: Specialisation;
}

export interface CourseClient {
  id: number;
  name: string;
  description: string;
  term: number;
  academicYear: string;
  teaserImage: string;
  tags: string[];
  projects: Project[];
  teachers: AllTeachersClient[];
  // Relations
  learningLineId: number;
  specialisationId: number;
  learningLine: LearningLine;
  specialisation: Specialisation;
}

export interface Generation {
  id: number;
  years: string;
  name: string;
}
