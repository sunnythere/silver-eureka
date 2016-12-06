import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
import store from '../store';
import {SET_LYRICS} from '../constants';
import setLyrics from '../action-creators/lyrics';
import Lyrics from '../components/Lyrics';

class LyricsContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = Object.assign({
      artistQuery: '',
      songQuery:''
      },store.getState());
    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  setArtist(artistName){
    this.setState({
      artistQuery: artistName
    })
  }

  setSong(songName){
    this.setState({
      songQuery: songName
    })
  }

  handleSubmit(){
    console.log("handle submit log: ", this.state);
  }


  render () {
    console.log(this)
    return (
      <Lyrics
        text={this.state.text}
        setArtist={this.setArtist}
        setSong={this.setSong}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />
    )

  }
}

export default LyricsContainer;
