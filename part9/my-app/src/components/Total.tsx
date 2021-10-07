import React from 'react';
import {CourseParts} from '../types';


const Total = ({courseParts}: CourseParts) => {
  return(
    <h2>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </h2>
  )
}

export default Total;