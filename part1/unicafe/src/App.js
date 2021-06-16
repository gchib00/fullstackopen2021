import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const Statistics = ({goodReviews, neutralReviews, badReviews}) => {
  const all = goodReviews + neutralReviews + badReviews
  const average = ((goodReviews - badReviews) / all)
  const positive = (goodReviews / all)
  
  if (all === 0) {
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={goodReviews} />
          <Statistic text="neutral" value={neutralReviews} />
          <Statistic text="bad" value={badReviews} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h2>feedback</h2>
        <Button text='good' clickHandler={ () => setGood(good+1) } />
        <Button text='neutral' clickHandler={ () => setNeutral(neutral+1) } />
        <Button text='bad' clickHandler={ () => setBad(bad+1) } />
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

