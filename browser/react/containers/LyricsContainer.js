import React from 'react';
import axios from 'axios';
import NewPlaylist from '../components/NewPlaylist';
import store from '../store';
import {SET_LYRICS} from '../constants';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';

import Lyrics from '../components/Lyrics';

class LyricsContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
      }, store.getState());

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
    // console.log("handle submit log: ", this.state);
    if (this.state.artistQuery && this.state.songQuery) {

      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));

      // axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      // .then(response => {
      //     // console.log(response.data);
      //     const setLyricsAction = setLyrics(response.data.lyric);
      //     store.dispatch(setLyricsAction);
      //   });
    }
  }


  render () {
    // console.log('this the whole state' + this.state)
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
