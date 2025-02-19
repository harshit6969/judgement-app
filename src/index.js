import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";

import Home from './Views/Home';
import Judgement from './Views/Judgement';


import {
    HashRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  // eslint-disable-next-line no-extend-native
  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

const hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}>
    <Switch>
    <Route path="/judgement-app/:id">
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
