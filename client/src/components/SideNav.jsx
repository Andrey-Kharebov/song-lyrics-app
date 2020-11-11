import React from 'react';
import BandsList from './BandsList/BandsList';
import classes from './SideNav.module.css';

const SideNav = (props) => {
  return (
    <div className={classes.sideNav}>
      <div className={classes.searchSection}>Search Block</div>
      <BandsList />
    </div>
  )
}

export default SideNav;