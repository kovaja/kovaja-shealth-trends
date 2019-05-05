import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './bootstrap-grid.css';
import Main from './components/Main';
import './index.css';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
