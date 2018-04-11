import React, { Component } from 'react';
import './Upload.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class Upload extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      material: '',
      year: '',
      height: '',
      width: '',
      mainImage: '',
      collection: []
    }

  }
    onDrop = (acceptedFiles, rejectedFiles) => { 
      this.setState({
        mainImage: this.state.collection[0] ? this.state.collection[0].preview : acceptedFiles[0].preview,
        collection: [...this.state.collection, ...acceptedFiles]
      });
    }

    handleDelete = e => {
      const currId = e.target.id
      this.setState({
        collection: this.state.collection.filter(image => {
          return image.preview !== currId
        })
      }, () => {
        if (this.state.mainImage === currId) {
          this.setState({
            mainImage: this.state.collection[0].preview
          })
        }
      })
      
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

    selectMain = e => {
      console.log(e.target);
      this.setState({
        mainImage: e.target.src
      })      
    }

    render() {
      const { state } = this;
      return (
        <div className="Upload">
        <p>Upload new Artwork</p>
        <form>
          <div className="text-image">
            <div className="text-fields">
              <div>
                <label>Title:
                  <input type="text" value={ state.title } name="title" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label>Material:
                  <input type="text" value={ state.material } name="material" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label>Year:
                  <input type="number" value={ state.year } name="year" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label>Dimension:
                  <input type="number" value={ state.height } name="height" onChange={this.handleChange}/>
                  <input type="number" value={ state.width } name="width" onChange={this.handleChange}/>
                </label>
              </div>
            </div>
            <Dropzone
              multiple={true}
              accept="image/*"
              onDrop={this.onDrop.bind(this)}>
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
          <div>
            <button onClick={this.handleClick}>Upload</button>          
          </div>
        </form>
        <div className="previews-container">
          {this.state.collection.map( image => {
            return(
              <div className="preview-list" key={image.preview} >
                <img 
                  src={image.preview}
                  alt={image.name}
                  onClick={this.selectMain}
                  className={this.state.mainImage === image.preview ? 'previews-selected previews' : 'previews'} />
                <span onClick={this.handleDelete} id={image.preview} role="img" alt=''>🗑️</span>
              </div>
            )}
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
