import React from 'react'
import Preloader from '../../helpers/Preloader/Preloader';
import { connect } from 'react-redux';
import { setActiveSongAndLyrics } from '../../../redux/reducers/songs-reducer';
import classes from './SongsList.module.css';

function SongsList(props) {
  // console.log('SONGS LIST RENDER');

  if (!props.isReady) {
    return (
      <Preloader />
    )
  }

  return (
    <div>
      { props.songs.length 
      ? <ul>
          { props.songs && props.songs.map(song => {
            return <li 
            className={ song.active ? classes.active : '' }
            key={ song._id }
            onClick={ () => {props.setActiveSongAndLyrics( song._id )} }
            >{ song.title }
            </li>
          })}
        </ul>
      : <p>Здесь пока нет ни одной песни.</p>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, { setActiveSongAndLyrics })(SongsList);

