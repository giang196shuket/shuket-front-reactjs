import React from 'react'

export const ProductTime = ({row}) => {
  return (
    <div>
    <p> {new Date(row.create_time).toLocaleString()}</p>
    <p>{row.create_name}</p>
    <hr />
    <p>{new Date(row.update_time).toLocaleString()}</p>
    <p>{row.update_name}</p>
  </div>
  )
}
