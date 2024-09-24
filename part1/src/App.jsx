import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  // console.log(props)
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part part={part} key={index} />
      ))}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  let total = 0
  for (let part in props.parts) {
    total += props.parts[part].exercises
  }
  return <p>Number of exercises {total}</p>
}

const Cource = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Button = ({ name, title, handleClick }) => {
  return <button onClick={handleClick(title)}>{name}</button>
}

const StatistTable = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'give feedback'
  const title1 = 'statistics'

  const all = good + neutral + bad

  const average = (good * 1 + neutral * 0 + bad * -1) / all

  const percentage = good / all

  return (
    <div>
      <h2>{title}</h2>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>{title1}</h2>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        percentage={percentage}
      />
    </div>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table className='center'>
        <thead>
          <tr>
            <th>text</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.all} />
          <StatisticLine text='average' value={props.average} />
          <StatisticLine text='percentage' value={props.percentage} />
        </tbody>
      </table>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
]

let initialCounters = Array(anecdotes.length).fill(0)

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initialCounters)

  const handleNext = () => {
    if (selected == anecdotes.length - 1) {
      setSelected(0)
    } else {
      setSelected(selected + 1)
    }
  }

  const handleVote = () => {
    const nextCounters = points.map((c, i) => {
      if (i === selected) {
        // Increment the clicked counter
        return c + 1
      } else {
        // The rest haven't changed
        return c
      }
    })
    setPoints(nextCounters)
  }

  const findMaxIndex = () => {
    //https://stackoverflow.com/questions/32647149/why-is-math-max-returning-nan-on-an-array-of-integers
    const find = points.indexOf(Math.max(...points))
    return find
  }

  useEffect(() => {
    console.log('init_points', points)
    // setPoints(Array(anecdotes.length).fill(0))
    console.log('findMaxIndex', findMaxIndex())
  }, [points])

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>

      <div className='buttonList'>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>

      <h2>Anecdote with most votes</h2>
      <div>
        <p>{anecdotes[findMaxIndex()]}</p>
        <p>has {points[findMaxIndex()]} votes</p>
      </div>
    </div>
  )
}

export default App
