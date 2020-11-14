import React, { memo, useEffect } from 'react';
import classes from './BandsList.module.css';
import { connect } from 'react-redux';
import { fetchBands, setActiveBandAndSongs, setActiveBandAndSongsAndSongs } from '../../../redux/reducers/bands-reducer';
import Preloader from '../../helpers/Preloader/Preloader';


function BandsList(props) {

  // console.log('BANDS LIST RENDER');
  
  useEffect(() => {
    props.fetchBands();
  }, [props.fetchBands])

  if (!props.isReady) {
    return (
      <Preloader />
    )
  }

  return (
    <div className={classes.bandsList}>
      <ul>
        { props.bands && props.bands.map(band => {
          return <li 
            className={ band.active ? classes.active : '' }
            key={band._id} 
            onClick={ () => {props.setActiveBandAndSongs( band._id )} }
            >{band.title}
          </li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    bands: state.bandsReducer.bands,
    isReady: state.bandsReducer.isReady
  }
}

export default connect(mapStateToProps, { fetchBands, setActiveBandAndSongs })(BandsList);

