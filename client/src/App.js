import classes from './App.module.css';
import BandsSection from './components/BandsSection';
import 'materialize-css';

function App() {
  return (
    <div className={classes.layout}>
      <BandsSection />
    </div>
  );
}

export default App;