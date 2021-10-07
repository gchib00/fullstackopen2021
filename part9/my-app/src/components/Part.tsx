import React from 'react';
import {CoursePart} from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
interface PartProps {
  key: string,
  course: CoursePart
}
const Part = (props: PartProps) => {
  const { course } = props;
  switch(course.type){
    case('normal'): {
      return(
      <div>
        <p><strong>{course.name} {course.exerciseCount}</strong></p>
        <p>{course.description}</p>
      </div>)
      break;
    }
    case('groupProject'): {
      return(
      <div>
        <p><strong>{course.name} {course.exerciseCount}</strong></p>
        <p>{course.description}</p>
        <p>project exercises: {course.groupProjectCount}</p>
      </div>)
      break;
    }
    case('submission'): {
      return(
      <div>
        <p><strong>{course.name} {course.exerciseCount}</strong></p>
        <p>{course.description}</p>
        <p>submit to: {course.exerciseSubmissionLink}</p>
      </div>)
      break;
    }
    case('special'): {
      return(
      <div>
        <p><strong>{course.name} {course.exerciseCount}</strong></p>
        <p>{course.description}</p>
        <p>Required skills: {course.requirements}</p>
      </div>)
      break;
    }
    default: {
      return assertNever(course);
    }
  }
}

export default Part;