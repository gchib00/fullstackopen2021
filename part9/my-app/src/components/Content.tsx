import React from 'react';
import {CourseParts} from '../types';
import Part from './Part';

const Content = ({courseParts}: CourseParts) => {
  return(
    <div>
      {courseParts.map(course => {
        return <Part key={course.name} course={course}/>
      })}
    </div>
  )
}

export default Content;