export interface CoursesData {
  courses: CourseDataInside
}

export interface CourseDataInside {
  data: Course[]
}

export interface Course {
  attributes: CourseInfo
}

export interface CourseInfo {
  description: string,
  name: string,
  periode: number,
}