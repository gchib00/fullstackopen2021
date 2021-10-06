export interface CourseParts {
  courseParts: Array<CoursePartBase>
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

export interface CourseNormalPart extends CoursePartBase {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;