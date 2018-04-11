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
        mainImage: acceptedFiles[0],
        collection: acceptedFiles
      }, () => console.log(this.state));

    }

    handleTitle = e => {
      this.setState({title: e.target.value});
    }

    handleMaterial = e => {
      this.setState({material: e.target.value});
    }

    handleYear = e => {
      this.setState({year: e.target.value});
    }

    handleHeight = e => {
      this.setState({height: e.target.value});
    }

    handleWidth = e => {
      this.setState({width: e.target.value});
    }

    handleClick = e => {

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
                  <input type="text" value={ state.title } onChange={this.handleTitle}/>
                </label>
              </div>
              <div>
                <label>Material:
                  <input type="text" value={ state.material } onChange={this.handleMaterial}/>
                </label>
              </div>
              <div>
                <label>Year:
                  <input type="number" value={ state.year } onChange={this.handleYear}/>
                </label>
              </div>
              <div>
                <label>Dimension:
                  <input type="number" value={ state.height } onChange={this.handleHeight}/>
                  <input type="number" value={ state.width } onChange={this.handleWidth}/>
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
      </div>
    );
  }
}

export default Upload;
