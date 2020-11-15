import React from 'react';
import LyricsComponent from './LyricsComponent/LyricsComponent';
import classes from './LyricsSection.module.css';
import { connect } from 'react-redux';
import { find } from 'lodash';

function LyricsSection(props) {
  return (
    <div className={classes.lyricsSection}>
      { props.activeSong 
        ? <>
            <div>{ props.activeBand.title + ' - ' + props.activeSong.title }</div>
            <LyricsComponent />
          </>
        : <p>Выберите песню</p>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeSong: find(state.songsReducer.songs, function(o) { return o.active === true }),
    activeBand: find(state.bandsReducer.bands, function(o) { return o.active === true })
  }
}

export default connect(mapStateToProps, {})(LyricsSection);

