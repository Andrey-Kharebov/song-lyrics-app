import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'materialize-css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Provider store={ store }>
            <App />
          </Provider>
        </Route>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
