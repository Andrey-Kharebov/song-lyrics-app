import classes from './App.module.css';
import BandsSection from './components/BandsSection/BandsSection';
import SongsSection from './components/SongsSection/SongsSection';

function App() {
  return (
    <div className={classes.layout}>
      <BandsSection />
      <SongsSection />
    </div>
  );
}

export default App;