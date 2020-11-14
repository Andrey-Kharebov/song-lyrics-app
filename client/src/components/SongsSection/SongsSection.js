import React from 'react';
import AddSongInput from './AddSongInput/AddSongInput';
import classes from './SongsSection.module.css';
import { connect } from 'react-redux';
import SongsList from './SongsList/SongsList';
import { find } from 'lodash';

const SongsSection = (props) => {

  // console.log('SONGS SECTION RENDER');
  // console.log(props);

  return (
    <div className={classes.songsSection}>
      
      { !props.songs.length && !props.activeBand
        ? <p>Выберите группу</p>
        : <>
            <SongsList songs={ props.songs } isReady={ props.isReady } />
            <AddSongInput activeBand={ props.activeBand } />
          </>   
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    songs: state.songsReducer.songs,
    isReady: state.songsReducer.isReady,
    activeBand: find(state.bandsReducer.bands, function(o) { return o.active === true })
  }
} 

export default connect(mapStateToProps, { })(SongsSection);

