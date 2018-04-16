import React, { Component } from 'react';
import './App.css';
import Upload from './Upload';
import axios from 'axios';
import ArtworkList from '../components/ArtworkList';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      artwork: []
    };
  }

  componentDidMount () {
    this.getArtwork();
    console.log(this.state);

  }

  getArtwork = () => {
    axios.get('http://localhost:3002/getAll')
      .then(res => {
        console.log(res);
        
        res = res.data.map(art => ({
          title: art.title.title,
          material: art.title.material,
          year: art.title.year,
          mainImage: `data:image/jpeg;base64,${art.file.filter(item => {
            return item.fieldname === 'main-image'
          })[0].data}`,
          collection: art.file,
        }));
        this.setState({ artwork: res });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <div className="Manager">
            <p>NOBA</p>
            <p>manager side</p>
          </div>
        </header>
        <ArtworkList artworkArray={this.state.artwork} />
        <Upload></Upload>
      </div>
    );
  }
}

export default App;
