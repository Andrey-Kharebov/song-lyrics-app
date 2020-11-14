import React, { useState, useEffect } from 'react';
import classes from './AddSongInput.module.css';
import { useMessage } from '../../../hooks/message.hook';
import { connect } from 'react-redux';
import { addSong } from '../../../redux/reducers/songs-reducer';

const AddSongInput = (props) => {

  console.log('ADD SONG INPUT RENDER');
  // console.log(props);

  const message = useMessage();
  const [song, setSong] = useState({ title: '' });
  
  useEffect(() => {
    props.apiMessage && message( props.apiMessage )
  }, [props.apiMessage, message])

  const changeHandler = (event) => {
    setSong({ ...song, title: event.target.value })
  }

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      props.addSong(song.title, props.activeBand._id)
      setSong({ ...song, title: ''});
    }
  }

  return (
    <div>
      <input 
        className="add-input"
        type="text" 
        placeholder="Добавить песню"
        name="title"
        value={ song.title }
        onChange={ changeHandler } 
        onKeyPress={ pressHandler }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    apiMessage: state.songsReducer.apiMessage
  }
}

export default connect(mapStateToProps, { addSong })(AddSongInput);
