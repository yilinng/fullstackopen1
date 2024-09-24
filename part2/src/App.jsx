import { useEffect } from 'react'
import { useState } from 'react'
import Course from './Course'
import personService from './services/persons'
import './index.css'

const CourseList = () => {
  return (
    <>
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </>
  )
}
const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1,
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2,
      },
    ],
  },
]

const Filter = ({ filterText, handleFilterText }) => {
  return (
    <div className='filter'>
      <p>
        filter shown with
        <input value={filterText} onChange={handleFilterText} />
      </p>
    </div>
  )
}

const PersonForm = ({
  addNote,
  newName,
  newNb,
  handleNameChange,
  handleNbChange,
}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        numbers: <input value={newNb} onChange={handleNbChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({ filteredList, handleDelete }) => {
  return (
    <table>
      <tbody>
        {filteredList.length ? (
          filteredList.map((person, index) => (
            <Person person={person} key={index} handleDelete={handleDelete} />
          ))
        ) : (
          <tr>
            <td>add some person...</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const App = () => {
  return <div></div>
}

export default App
