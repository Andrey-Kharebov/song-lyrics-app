import React from 'react';
import classes from './BandsList.module.css';

function BandsList(props) {
  return (
    <div className={classes.bandsList}>
      <ul>
      { props.bands.map(band => {
        return <li key={band._id}>{band.title}</li>
      })}
      </ul>
    </div>
  )
}

export default BandsList;
