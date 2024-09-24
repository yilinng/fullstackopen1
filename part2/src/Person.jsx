import React from 'react'

export default function Person({ person, handleDelete }) {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => handleDelete(person)}>delete</button>
      </td>
    </tr>
  )
}
