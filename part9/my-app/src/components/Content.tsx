import React from 'react';
import {CourseParts} from '../types';

const Content = ({courseParts}: CourseParts) => {
  courseParts.map(course => {
    console.log(course.name, course.exerciseCount)
  })
  return(
    <ul>
      {courseParts.map(course => {
        return <li key={course.name}>{course.name} {course.exerciseCount}</li>
      })}
    </ul>
  )
}

export default Content;