import React, { Component } from 'react';
import './App.css';
import Upload from './Upload';
import axios from 'axios';
import ArtworkItem from '../components/ArtworkItem';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      artworks: []
    };
  }

  componentDidMount () {
    this.getArtwork();
  }

  getArtwork = () => {
    axios.get('https://noba-server.herokuapp.com/getAll')
      .then(res => {
        this.setState({ artworks: res.data });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Manager">
            <h1>NOBA</h1>
            <h3>manager</h3>
          </div>
        </header>
        <Upload onUpload={this.getArtwork}></Upload>
        <h1>Artworks</h1>
        <div className="artworkList">
          {this.state.artworks.map((artwork, i) => {
            return (
              <div key={i}>
                <ArtworkItem
                  onDelete={this.getArtwork}
                  artwork={artwork}
                />
              </div>
            )
          })
        }
        </div>
      </div>
    );
  }
}

export default App;
