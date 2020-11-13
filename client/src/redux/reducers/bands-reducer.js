import { bandsAPI } from '../../components/api/api';

const SET_BANDS = 'SET-BANDS';
const ADD_API_MESSAGE = 'ADD-API-MESSAGE';
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
    case ADD_API_MESSAGE: 
      return {
        ...state,
        apiMessage: action.message
      }
    case SET_ACTIVE_BAND: 
      return {
        ...state,
        bands: state.bands.map(i => {
          if (i._id === action.id) {
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
export const addApiMessage = (message) => ({ type: ADD_API_MESSAGE, message })
export const setActiveBand = (id) => ({type: SET_ACTIVE_BAND, id});

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
        return dispatch(addApiMessage(response.message));
      }
      
      dispatch(addApiMessage(response.message));
      dispatch(fetchBands());
    })
}



export default bandsReducer;