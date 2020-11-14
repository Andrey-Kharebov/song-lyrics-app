import { songsAPI } from '../../components/api/api';

const SET_SONGS = 'SET-SONGS';
const TOGGLE_IS_READY = 'TOGGLE-IS-READY';
const ADD_SONG_API_MESSAGE = 'ADD-SONG-API-MESSAGE';
const SET_ACTIVE_SONG = 'SET-ACTIVE-SONG';

const initialState = {
  songs: [],
  isReady: false,
  apiMessage: null
}

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONGS: 
      return {
        ...state,
        songs: [...action.payload],
        isReady: true,
        apiMessage: null
      }
    case TOGGLE_IS_READY: 
      return {
        ...state,
        isReady: action.isReady
      }
    case ADD_SONG_API_MESSAGE: 
      return {
        ...state,
        apiMessage: action.message
      }
    case SET_ACTIVE_SONG: 
      return {
        ...state,
        songs: state.songs.map(i => {
          if (i._id === action.songId) {
            return { ...i, active: true }
          }
          return { ...i, active: false }
        })
      }
    default: 
      return state;
  }
}

// Action Creators
export const setSongs = (payload) => ({ type: SET_SONGS, payload });
export const toggleisReady = (isReady) => ({ type: TOGGLE_IS_READY, isReady });
export const addSongApiMessage = (message) => ({ type: ADD_SONG_API_MESSAGE, message });
export const setActiveSong = (songId) => ({type: SET_ACTIVE_SONG, songId});;

// Thunks & Thunk-creators
export const fetchSongs = (bandId) => (dispatch) => {
  dispatch(toggleisReady(false));
  songsAPI.getSongsFromDB(bandId)
    .then(response => {
      dispatch(setSongs(response.songs))
    })
}

export const addSong = (title, bandId) => (dispatch) => {
  songsAPI.addSongToDB(title, bandId)
    .then(response => {  
      if (response.status === 400 ) {
        return dispatch(addSongApiMessage(response.message));
      }

      dispatch(fetchSongs(bandId));
      dispatch(addSongApiMessage(response.message));
    })
}

export const setActiveSongAndLyrics = (songId) => (dispatch) => {
  dispatch(setActiveSong(songId));
  // dispatch(fetchLyrics(songId));
}

export default songsReducer;
