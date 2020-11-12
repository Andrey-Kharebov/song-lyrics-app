import Axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { useMessage } from '../hooks/message.hook';
import BandsList from './BandsList/BandsList';
import classes from './BandsSection.module.css';

const SideNav = (props) => {
  const message = useMessage();
  const [bands, setBands] = useState(null);

  const [error, setError] = useState(null);
  const [band, setBand] = useState({
    title: ''
  });
  const clearError = useCallback(() => setError(null), []);

  const fetchBands = useCallback(async () => {
    try {
      const bandit = await Axios.get('/bands')
        .then(response => {
          const bank = response.data.bands
          return bank;
        })
      setBands(bandit);
    } catch (e) {}
  })

  useEffect(() => {
    fetchBands();
  }, [])

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

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
          await Axios.post('/band', { title })
            .then(response => {
              message(response.data.message)
            })
            .catch(error => {
              message(error.response.data.message)
            })
        }
      } catch (e) {
        setError(e.message);
        throw e;
      }
    }
  }

  if (!bands) {
    return (
    <div className={classes.sideNav}>
      <p>LOADING</p>
    </div>
    )
  }

  return (
    <div className={classes.sideNav}>
      <div className={classes.searchSection}>Search Block</div>
      <BandsList bands={ bands } />
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