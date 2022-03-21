import AppHeader from '../AppHeader/AppHeader';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from '../Routers/Routers';

const App = () => {
  return (
      <Router>
          <AppHeader />
          <Routes />
      </Router>
  );
  };

export default App;
