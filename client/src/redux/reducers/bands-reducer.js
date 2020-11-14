import { bandsAPI } from '../../components/api/api';
import { fetchSongs } from './songs-reducer';

const SET_BANDS = 'SET-BANDS';
const ADD_BAND_API_MESSAGE = 'ADD-BAND_API-MESSAGE';
const SET_ACTIVE_BAND = 'SET-ACTIVE-BAND';

const initialState = {
  bands: [],
  isReady: false,
  apiMessage: null
}

const bandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANDS: 
      return {
        ...state,
        bands: [...action.payload],
        isReady: true,
        apiMessage: null
      }
    case ADD_BAND_API_MESSAGE: 
      return {
        ...state,
        apiMessage: action.message
      }
    case SET_ACTIVE_BAND: 
      return {
        ...state,
        bands: state.bands.map(i => {
          if (i._id === action.bandId) {
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
export const setBands = (payload) => ({ type: SET_BANDS, payload });
export const addBandApiMessage = (message) => ({ type: ADD_BAND_API_MESSAGE, message })
export const setActiveBand = (bandId) => ({type: SET_ACTIVE_BAND, bandId});

// Thunks & Thunk-creators
export const fetchBands = () => (dispatch) => {
  bandsAPI.getBandsFromDB()
    .then(response => {
      dispatch(setBands(response.bands))
    })
}

export const addBand = (title) => (dispatch) => {
  bandsAPI.addBandToDB(title)
    .then(response => {
      
      if (response.status === 400 ) {
        return dispatch(addBandApiMessage(response.message));
      }
      
      dispatch(addBandApiMessage(response.message));
      dispatch(fetchBands());
    })
}

export const setActiveBandAndSongs = (bandId) => (dispatch) => {
  dispatch(setActiveBand(bandId));
  dispatch(fetchSongs(bandId));
}


export default bandsReducer;