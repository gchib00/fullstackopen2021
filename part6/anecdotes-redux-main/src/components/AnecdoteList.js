import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {notifyVoteSuccess} from '../reducers/notificationReducer'

const  AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdoteReducer)
  const filter = useSelector(state => state.filterReducer)
  let filteredList = [...anecdotes]
  try {
    filteredList = filteredList.filter(item => item.content.includes(filter))
    filteredList = filteredList.sort((a, b) => {return b.votes - a.votes})
  } catch (error) {console.error(error)}

  const dispatch = useDispatch()
  const voteForItem = (id, content) => {
    dispatch(addVote(id))
    dispatch(notifyVoteSuccess(content, 4000))
  }
  return (
    <div>
      {filteredList.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>voteForItem(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
