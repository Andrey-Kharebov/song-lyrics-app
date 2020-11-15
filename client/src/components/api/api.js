import Axios from 'axios';

const instance = Axios.create({
  baseURL: '/'
})

export const bandsAPI = {
  getBandsFromDB() {
    return (
      instance.get(`bands`)
        .then(response => response.data)
    )
  },
  addBandToDB(title) {
    return (
      instance.post(`band`, {title})
        .then(response => {
          return {status: 201, message: response.data.message}
        })
        .catch(error => {
          return {status: 400, message: error.response.data.message}
        })
    )
  }
}

export const songsAPI = {
  getSongsFromDB(bandId) {
    return (
      instance.get(`songs/${ bandId }`)
        .then(response => response.data)
    )
  },
  addSongToDB(title, bandId) {
    return (
      instance.post(`/song`, {title, bandId})
        .then(response => {
          return {status: 201, message: response.data.message}
        })
        .catch(error => {
          return {status: 400, message: error.response.data.message}
        })
    )
  }
}

export const lyricsAPI = {
  getLyricsFromDB(songId) {
    return (
      instance.get(`lyrics/${ songId }`)
        .then(response => response.data)
    )
  },
  addLyricsToDB(lyrics, songId) {
    return (
      instance.post('/lyrics', {lyrics, songId})
        .then(response => {
          return {status: 201, message: response.data.message}
        })
        .catch(error => {
          return {status: 400, message: error.response.data.message}
        })
    )
  },
  updateLyricsInDB(lyricsId, lyrics) {
    return (
      instance.post('/lyrics/edit', {lyricsId, lyrics})
        .then(response => {
          return {status: 201, message: response.data.message}
        })
        .catch(error => {
          return {status: 400, message: error.response.data.message}
        })
    )
  }
}