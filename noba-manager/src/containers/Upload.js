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
      collection: [],
    };

  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      mainImage: this.state.collection[0] ? this.state.collection[0].preview : acceptedFiles[0].preview,
      collection: [...this.state.collection, ...acceptedFiles],
    });
  };

  handleDelete = e => {
    const currId = e.target.id;
    this.setState({
      collection: this.state.collection.filter(image => image.preview !== currId),
    }, () => {
      if (this.state.mainImage === currId) {
        this.setState({
          mainImage: this.state.collection[0].preview,
        });
      }
    });

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectMain = e => {
    console.log(e.target);
    this.setState({
      mainImage: e.target.src,
    });
  };

  sendserver = () => {
    var files = this.state.collection;
    var formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('material', this.state.material);
    formData.append('year', this.state.year);
    formData.append('height', this.state.height);
    formData.append('width', this.state.width);
    files.forEach(file => {
      this.state.mainImage === file.preview ? formData.append('main-image', file) : formData.append(file.preview, file);
    });

    request.post('http://localhost:3002/upload')
      .send(formData)
      .end();
  };

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
        </form>
        <div className="previews-container">
          {this.state.collection.map(image => {
          return (
            <div className="preview-list" key={image.preview} >
                <img
                src={image.preview}
                alt={image.name}
                onClick={this.selectMain}
                className={this.state.mainImage === image.preview ? 'previews-selected previews' : 'previews'} />
                <span onClick={this.handleDelete} id={image.preview} role="img" alt=''>🗑️</span>
              </div>
          );}
        )}
        </div>
        <button onClick={this.sendserver}>Upload</button>
      </div>
  );
  }
}

export default Upload;