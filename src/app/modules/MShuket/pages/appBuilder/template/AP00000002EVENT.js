import React from 'react'
import { Carousel } from "react-bootstrap";

export const AP00000002EVENT = ({dt}) => {
  return (
    dt?.data_app?.contentsData.length === 1 ?(
        <img className="d-block w-100" src={dt?.data_app?.contentsData[0].imageUrl} alt="" />
    
      ):(
        <Carousel>
        {dt?.data_app?.contentsData.map((dtc) => {
          return (
            <Carousel.Item style={{marginTop:20, marginBottom:20}}>
              <img className="d-block w-100" src={dtc.imageUrl} alt="" />
            </Carousel.Item>
          );
        })}
      </Carousel>
      )
  )
}
