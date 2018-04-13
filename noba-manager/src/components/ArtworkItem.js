import React from 'react';
import './ArtworkItem.css'

export default function ArtworkItem (props) {

  return (

    <div className="item-container">
      <div className="image-container">
        <img src={props.mainImage} alt=""/>
      </div>
      <p className="title">{props.title}</p>
      <p className="material">{props.material}</p>
      <p className="year">{props.year}</p>
    </div>
  )
}
//
