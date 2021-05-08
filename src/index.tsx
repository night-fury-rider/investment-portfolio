import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './uv_components.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import { uvStore } from './uv_store';

ReactDOM.render(
  <Provider store={uvStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
