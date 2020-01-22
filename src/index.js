import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserHistory } from "history";

import Home from './Views/Home';
import Judgement from './Views/Judgement';


import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}>
    <Switch>
      {/* {routes.map((route) => (
<Route exact key={route.Name} component={route.View} path={route.Route} />
  ))} */}
    <Route exact path="/Home">
      <Home/>
    </Route>
    <Route path="/Judgement">
      <Judgement/>
    </Route>
    <Route path="*">
        <Home />
    </Route>
  </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
