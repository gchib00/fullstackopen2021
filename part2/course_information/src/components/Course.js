const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((accumulator, parts) => {
        return accumulator + parts.exercises
    }, 0)

    return(
      <p><strong>Number of exercises: {sum}</strong></p>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.id} />)}
            <Total course={course} />
        </div>
    )
  }




const Course = ({ course }) => {
    return(
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}

export default Course