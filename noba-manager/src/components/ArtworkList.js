import React from 'react';
import ArtworkItem from './ArtworkItem'

import './ArtworkList.css'

export default function ArtworkList (props) {
  const artworkArray = props.artworkArray.map((art, i) => {
    return (
      <div key={i}>
        <ArtworkItem
          title={art.title}
          material={art.material}
          year={art.year}
          mainImage={art.mainImage}
        />
      </div>
    )
  })
  return (
    <div className="artworkList">
      {artworkArray}
    </div>
  )
}