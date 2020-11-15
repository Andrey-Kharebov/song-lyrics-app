import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addLyrics, changeSongLyrics, updateDbLyrics } from '../../../redux/reducers/lyrics-reducer';
import { find } from 'lodash';
import classes from './LyricsComponent.module.css';
import Preloader from '../../helpers/Preloader/Preloader';
import { useMessage } from '../../../hooks/message.hook';


const LyricsComponent = (props) => {

  const message = useMessage();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    props.apiMessage && message( props.apiMessage )
  }, [props.apiMessage, message])

  useEffect(() => {
    deactivateEditMode();
  }, [props.lyricsId])

  const changeHandler = (event) => {
    props.changeSongLyrics(event.target.value)
  }
  
  const pressHandler = (event) => {
    props.addLyrics(props.lyrics, props.activeSong._id);
    deactivateEditMode();
  }

  const updateHandler = (event) => {
    props.updateDbLyrics(props.lyricsId, props.activeSong._id, props.lyrics);
    deactivateEditMode();
  }

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
  }

  if (!props.isReady) {
    return (
      <Preloader />
    )
  }

  return (
    <div className={classes.lyricsComponent}>
      <div className={classes.textareaSection}>
        <textarea
          value={ (props.lyrics && props.lyrics) || '' }
          placeholder="Добавьте текст"
          onClick={ activateEditMode }
          onChange={ changeHandler }
        ></textarea>
      </div>
      <div>
        { (props.lyrics && props.lyricsId) || props.lyricsId
          ? <button
              className={ editMode ? "waves-effect waves-light btn active" : "waves-effect waves-light btn" }
              onClick={ updateHandler }
            >Обновить</button>
          : <button 
              className="waves-effect waves-light btn active"
              onClick={ pressHandler }
            >Подтвердить</button>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    lyrics: state.lyricsReducer.lyrics,
    lyricsId: state.lyricsReducer.lyricsId,
    isReady: state.lyricsReducer.isReady,
    activeSong: find(state.songsReducer.songs, function(o) { return o.active === true }),
    apiMessage: state.lyricsReducer.apiMessage
  }
}

export default connect(mapStateToProps, { addLyrics, changeSongLyrics, updateDbLyrics })(LyricsComponent);

