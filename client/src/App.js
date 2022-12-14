import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';
import ErrorFound from './components/404notfound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component= {LandingPage} />
          <Route exact path='/home' component= {Home} />
          <Route exact path='/recipe' component={RecipeCreate} />
          <Route path='/recipes/:id' component={Detail} />
          <Route path= '/' component={ErrorFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;