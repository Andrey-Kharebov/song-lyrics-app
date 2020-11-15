import classes from './App.module.css';
import BandsSection from './components/BandsSection/BandsSection';
import LyricsSection from './components/LyricsSection/LyricsSection';
import SongsSection from './components/SongsSection/SongsSection';

function App() {
  return (
    <div className={classes.layout}>
      <BandsSection />
      <SongsSection />
      <LyricsSection />
    </div>
  );
}

export default App;