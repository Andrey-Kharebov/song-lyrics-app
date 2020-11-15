import { lyricsAPI } from "../../components/api/api";

const CHANGE_SONG_LYRICS = 'ADD-SONG-LYRICS';
const LYRICS_TOGGLE_IS_READY = 'LYRICS_TOGGLE-IS-READY';
const SET_LYRICS = 'SET-LYRICS';
const ADD_LYRICS_API_MESSAGE = 'ADD-LYRICS-API-MESSAGE';

const initialState = {
  lyrics: null,
  lyricsId: null,
  isReady: false,
  apiMessage: null
}

const lyricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SONG_LYRICS:
      return {
        ...state,
        lyrics: action.payload
      }
    case SET_LYRICS: 
      return {
        ...state,
        lyrics: action.payload[0] ? action.payload[0].lyrics : null,
        lyricsId: action.payload[0] ? action.payload[0]._id : null,
        isReady: true,
        apiMessage: null
      }
    case LYRICS_TOGGLE_IS_READY:
      return {
        ...state,
        isReady: action.isReady
      }
    case ADD_LYRICS_API_MESSAGE:
      return {
        ...state,
        apiMessage: action.message
      }
    default: 
      return state;
  }
}

export const setLyrics = (payload) => ({ type: SET_LYRICS, payload });
export const changeSongLyrics = (payload) => ({ type: CHANGE_SONG_LYRICS, payload })
export const lyircsToggleisReady = (isReady) => ({ type: LYRICS_TOGGLE_IS_READY, isReady });
export const addLyricsApiMessage = (message) => ({ type: ADD_LYRICS_API_MESSAGE, message });

export const fetchLyrics = (songId) => (dispatch) => {
  dispatch(lyircsToggleisReady(false));
  lyricsAPI.getLyricsFromDB(songId)
    .then(response => {
      dispatch(setLyrics(response.lyrics))
    })
}

export const addLyrics = (lyrics, songId) => (dispatch) => {
  lyricsAPI.addLyricsToDB(lyrics, songId)
    .then(response => {
      if (response.status === 400) {
        return dispatch(addLyricsApiMessage(response.message));
      }

      dispatch(fetchLyrics(songId));
      dispatch(addLyricsApiMessage(response.message));
    })
}

export const updateDbLyrics= (lyricsId, songId, lyrics) => (dispatch) => {
  lyricsAPI.updateLyricsInDB(lyricsId, lyrics)
    .then(response => {
      if (response.status === 400) {
        return dispatch(addLyricsApiMessage(response.message));
      }
      
      dispatch(fetchLyrics(songId));
      dispatch(addLyricsApiMessage(response.message));
    })
}
export default lyricsReducer;

