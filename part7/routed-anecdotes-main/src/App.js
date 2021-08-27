import React, { useState } from 'react'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { useField } from './hooks'
let timeoutID = 0

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const selectedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
  const infoStyle = {display: 'inline-flex', alignItems: 'center'}
  return(
    <div>
      <h1>{selectedAnecdote.content} by {selectedAnecdote.author}</h1>
      <p>number of votes: {selectedAnecdote.votes}</p>
      <div style={infoStyle}>
        <p style={{marginRight: 5}}>for more info visit:</p>
        <a href={selectedAnecdote.info}>{selectedAnecdote.info}</a>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdote/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
      </ul>
    </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    content.reset(); author.reset(); info.reset('')
  }
  const resetAllFields = () => {
    //empties the text from all fields manually
    content.reset(); author.reset(); info.reset('')
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={resetAllFields}>reset</button>
      </form>
    </div>
  )
}
const Notification = ({ notification }) => {
  let boxStyle = {
    width: '600px',
    height: '80px',
    border: '3px black solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  if(notification === '') {
    boxStyle = {visibility: 'hidden'}
  }

  return(
    <div style={boxStyle}>
      {notification}
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    clearTimeout(timeoutID)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote has been added: ${anecdote.content}`)
    timeoutID = setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path="/anecdote/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;