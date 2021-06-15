import React, { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const Statistics = ({goodReviews, neutralReviews, badReviews}) => {
    const all = goodReviews + neutralReviews + badReviews
    const average = ((goodReviews - badReviews) / all)
    const positive = (goodReviews / all)
    return(
      <div>
        <h2>statistics</h2>
        <p>good {goodReviews}</p>
        <p>neutral {neutralReviews}</p>
        <p>bad {badReviews}</p>
        <br />
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>feedback</h2>
        <button onClick={ () => setGood(good+1) }>good</button>
        <button onClick={ () => setNeutral(neutral+1) }>neutral</button>
        <button onClick={ () => setBad(bad+1) }>bad</button>
      </div>
      <Statistics
        goodReviews={good}
        neutralReviews={neutral}
        badReviews={bad}
      />
    </>
  )
}

export default App

