import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { addBand } from '../../../redux/reducers/bands-reducer';
import classes from './AddBandInput.module.css';
import { useMessage } from '../../../hooks/message.hook';

const AddBandInput = (props) => {

  // console.log('INPUT RENDER');

  const message = useMessage();
  const [band, setBand] = useState({ title: '' });
  
  useEffect(() => {
    props.apiMessage && message( props.apiMessage )
  }, [props.apiMessage, message])

  const changeHandler = (event) => {
    setBand({ ...band, title: event.target.value })
  }

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      await props.addBand(band.title);
      setBand({ ...band, title: ''});
    }
  }

  return (
    <div>
      <input 
        className="add-input"
        type="text" 
        placeholder="Добавить исполнителя"
        name="title"
        value={ band.title }
        onChange={ changeHandler } 
        onKeyPress={ pressHandler }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    apiMessage: state.bandsReducer.apiMessage
  }
}

export default connect(mapStateToProps, { addBand })(AddBandInput);

