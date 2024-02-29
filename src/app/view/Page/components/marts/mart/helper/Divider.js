import React from 'react'

export const Divider = ({text}) => {
  return (
    <div className="my-15">
    <hr/>
      <h5 style={{fontWeight:100, fontSize:'1.275em', color:'#212121'}}>{text}</h5>
    <hr/>
  </div>
  )
}
