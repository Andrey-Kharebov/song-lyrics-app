import AddBandInput from './AddBandInput/AddBandInput';
import BandsList from './BandsList/BandsList';
import classes from './BandsSection.module.css';

const BandsSection = (props) => {

  // console.log('BANDS SECTION RENDER');

  return (
    <div className={classes.bandsSection}>
      <BandsList />
      <AddBandInput />
    </div>
  )
}


export default BandsSection;

