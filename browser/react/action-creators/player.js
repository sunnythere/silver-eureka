import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST, SET_PROGRESS} from '../constants';
import { skip } from '../utils';
import AUDIO from '../audio';
import axios from 'axios';

const startPlaying = () => {
	return {
		type: START_PLAYING
	}
}

const stopPlaying = () => {
	return {
		type: STOP_PLAYING
	}
}

const setCurrentSong = (currentSong) => ({
  type: SET_CURRENT_SONG,
  currentSong
});

const setCurrentSongList = (currentSongList) => ({
  type: SET_LIST,
  currentSongList
});

export const play = () => dispatch => {
  AUDIO.play();
  dispatch(startPlaying());
};

export const pause = () => dispatch => {
  console.log("HEY")
  AUDIO.pause();
  dispatch(stopPlaying());
};

export const load = (currentSong, currentSongList) => dispatch => {
  AUDIO.src = currentSong.audioUrl;
  AUDIO.load();
  dispatch(setCurrentSongList(currentSongList));
  dispatch(setCurrentSong(currentSong));
};

export const startSong = (song, list) => dispatch => {
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
};

export const toggle = () => (dispatch, getState) => {
  const { isPlaying } = getState().player;
  if (isPlaying) dispatch(pause());
  else dispatch(play());
};

export const toggleOne = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
    //const { currentSong } = getState();
    if (selectedSong.id !== getState().player.currentSong.id)
      dispatch(startSong(selectedSong, selectedSongList));
    else dispatch(toggle());
};

export const next = () =>
  (dispatch, getState) => {
    dispatch(startSong(...skip(1, getState().player)));
};

export const prev = () =>
  (dispatch, getState) => {
    dispatch(startSong(...skip(-1, getState().player)));
};
