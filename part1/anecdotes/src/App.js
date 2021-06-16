import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  let [selected, setSelected] = useState(0)
  let [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const randomizeIndex = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const addVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const highestScore = votes.indexOf(Math.max(...votes))
  console.log(highestScore)


  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>"{anecdotes[selected]}" has {votes[selected]} votes</p>
      </div>
      <button onClick={randomizeIndex}>next anecdote</button>
      <button onClick={addVote}>vote</button>
      <br />
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>"{anecdotes[highestScore]}" has {votes[highestScore]} votes</p>
      </div>
    </div>
  )
}

export default App