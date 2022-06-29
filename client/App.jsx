import React from "react";
import MainContainer from './components/MainContainer.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';


const App = () => {
   return (
      <div className="app">
         <Router>
            <Switch>
               <Route exact path="/" exact component={Login} />
               <Route exact path="/login" exact component={Login} />
					<Route exact path="/register" exact component={Register} />
					<Route exact path="/main" exact component={MainContainer} />
            </Switch>
         </Router>
      </div>
   )
};

export default App;