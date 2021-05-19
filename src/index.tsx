import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './uv_components.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { uvStore } from './uv_store';

ReactDOM.render(
    <Provider store={uvStore}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
