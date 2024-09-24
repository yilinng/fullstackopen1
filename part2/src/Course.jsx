import React from 'react'

export default function Course({ course }) {
  const total = course.parts.reduce((s, { exercises }) => s + exercises, 0)

  console.log('total', total)
  //course.parts.map((part) => (total += part.exercises))
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}
const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Content = ({ parts }) => {
  if (parts.length) {
    return (
      <table>
        <tbody>
          {parts.map((part) => (
            <Part part={part} key={part.id} />
          ))}
        </tbody>
      </table>
    )
  }
}

const Part = ({ part }) => {
  return (
    <tr>
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  )
}

const Total = ({ total }) => {
  return (
    <b>
      <p>total of {total} exercises</p>
    </b>
  )
}
