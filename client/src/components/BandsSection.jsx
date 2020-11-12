import Axios from 'axios';
import React, { useState } from 'react';
import BandsList from './BandsList/BandsList';
import classes from './BandsSection.module.css';

const SideNav = (props) => {
  const [band, setBand] = useState({
    title: ''
  });

  const changeHandler = event => {
    setBand({...band, title: event.target.value })
  }

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        if (!band) {
          console.log(`Band input can't be empty!`);
        } else {
          const title = band.title;
          await Axios.post('/band', { title });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  

  return (
    <div className={classes.sideNav}>
      <div className={classes.searchSection}>Search Block</div>
      <BandsList />
      <div className="input-field">
        <input 
          id="band" 
          name="title" 
          type="text" 
          value={ band.title } 
          onChange={ changeHandler } 
          onKeyPress={ pressHandler }
        />
        <label htmlFor="band">Добавить группу</label>
      </div>
    </div>
  )
}

export default SideNav;