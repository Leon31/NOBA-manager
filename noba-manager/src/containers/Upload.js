import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import './Upload.css';

const CLOUDINARY_UPLOAD_PRESET = 'ygtbczxk';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/divleo/image/upload';

class Upload extends Component {
  constructor (props) {
    super(props);
    this.state = {
      artwork: {
        title:'',
        material:'',
        year:'',
        height:'',
        width:'',
        cover:'',
        urls: []
      },
      selectedCover: '',
      collection: [],
      loading: '',
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      selectedCover: this.state.collection[0] ? this.state.collection[0].preview : acceptedFiles[0].preview,
      collection: [...this.state.collection, ...acceptedFiles],
    });
  };

  handleDelete = e => {
    const currId = e.target.id;
    this.setState({
      collection: this.state.collection.filter(image => image.preview !== currId),
    }, () => {
      if (this.state.selectedCover === currId) {
        this.setState({
          selectedCover: this.state.collection[0].preview,
        });
      }
    });
  };

//on text fields change
  handleChange = e => {
    this.setState({
      artwork: {
        ...this.state.artwork,
        [e.target.name]: e.target.value
      }
    });
  };

  selectMain = e => {
    this.setState({
      selectedCover: e.target.src,
    });
  };

  upload = () => {
    const {title, material, year, height, width, cover} = this.state.artwork;
    if (title.length === 0 || material.length === 0
      || year.length === 0 || height.length === 0
      || width.length === 0 || this.state.collection.length === 0) return alert('some field are empty')
    this.setState({
      loading: 0
    })
    const uploaders = this.state.collection.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", file.preview === this.state.selectedCover ? 'cover' : '');
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("api_key", "887145548688338");
      return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        this.setState({
          loading: Math.floor(this.state.loading + 100/this.state.collection.length),
        })
        const data = response.data;
          this.setState({
            artwork: {
              ...this.state.artwork,
              cover:  data.tags[0] === 'cover' ? data.secure_url : this.state.artwork.cover,
              urls: [...this.state.artwork.urls, data.secure_url]
            }
          })
      })
    });

    axios.all(uploaders).then((res) => {
      this.setState({
        loading: 100
      })
      axios.post(`https://noba-server.herokuapp.com/postOne`, {artwork: this.state.artwork})
      .then(() => {
        this.props.onUpload();
        this.setState({
          artwork: {
            title:'',
            material:'',
            year:'',
            height:'',
            width:'',
            urls: []
          },
          cover: '',
          collection: [],
          loading:'',
        })
      });
    });
  }

  render() {
    const { artwork } = this.state;
    return (
      <div className="Upload">
        <p>Upload new Artwork</p>
        <form>
          <div className="text-image">
            <div className="text-fields">
              <div className="text-fields_input">
                <label>Title:</label>
                  <input type="text" value={artwork.title} name="title" onChange={this.handleChange}/>
              </div>
              <div className="text-fields_input">
                <label>Material:</label>
                  <input type="text" value={artwork.material} name="material" onChange={this.handleChange}/>
              </div>
              <div className="text-fields_input">
                <label>Year:</label>
                  <input type="number" value={artwork.year} name="year" onChange={this.handleChange}/>
              </div>
              <div className="text-fields_input">
                <label>Dimension:</label>
                <div>
                  <input id="dim_input_h" type="number" value={artwork.height} name="height" onChange={this.handleChange}/>
                  X
                  <input id="dim_input_w" type="number" value={artwork.width} name="width" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <Dropzone
              className="dropzone"
              multiple={true}
              accept="image/*"
              onDrop={this.onDrop.bind(this)}>
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
        </form>
        <div className="previews-container">
          {this.state.collection.map(image => {
          return (
            <div className="preview-list" key={image.preview} >
                <img
                src={image.preview}
                alt={image.name}
                onClick={this.selectMain}
                className={this.state.selectedCover === image.preview ? 'previews-selected previews' : 'previews'} />
                <span onClick={this.handleDelete} id={image.preview} role="img" alt=''>🗑️</span>
              </div>
          );}
        )}
        </div>
        <div className="uploading">
          <button className="button" onClick={this.upload}>Upload </button>
          <p className="percentage">{this.state.loading > 0 ? `${this.state.loading}%` : ''}</p>
        </div>
      </div>
  );
  }
}

export default Upload;
