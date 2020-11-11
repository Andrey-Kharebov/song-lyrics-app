import classes from './App.module.css';
import SideNav from './components/SideNav';
import 'materialize-css';

function App() {
  return (
    <div className={classes.layout}>
      <SideNav />
    </div>
  );
}

export default App;