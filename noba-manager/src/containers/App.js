import React, { Component } from 'react';
import './App.css'
import Upload from './Upload'
import axios from 'axios';
import ArtworkList from '../components/ArtworkList';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      artwork: []
    }
  }

  componentDidMount () {
    this.getArtwork();
    console.log(this.state);
    
  }

  getArtwork = () => {
    axios.get('http://www.nokeynoshade.party/api/queens/winners')
      .then(res => {
        console.log(res);
        
        res = res.data.map(art => ({
          title: art.name,
          material: art.quote,
          year: art.winner,
          mainImage: art.image_url
        }))
        this.setState({ artwork: res })
      })
  }

  render() {
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
