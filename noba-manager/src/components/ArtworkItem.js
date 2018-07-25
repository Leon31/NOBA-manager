import React, { Component } from 'react';
import './ArtworkItem.css'
import axios from 'axios';


class ArtworkItem extends Component{
  handleDelete = e => {
    const currId = e.target.id;
    axios.delete('https://noba-server.herokuapp.com/deleteOne', {data: {_id: currId}})
      .then(() => {
        this.props.onDelete();
      });
  };

  render(){
    const {artwork} = this.props
    return (
      <div className="artwork">
        <div className="artwork_image_container">
          <img className="artwork_image" src={artwork.cover} alt=""/>
        </div>
        <div className="artwork_details">
          <p className="artwork_details_title">{artwork.title}</p>
          <p className="artwork_details_material">{artwork.material}</p>
          <p className="artwork_details_year">{artwork.year}</p>
          <p className="artwork_details_year">{artwork.height}x{artwork.width}</p>
        </div>
        <div className="artwork_delete" onClick={this.handleDelete} id={artwork._id} role="img" alt=''>🗑️</div>
      </div>
    )
  }
}

export default ArtworkItem;
