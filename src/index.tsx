import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { GlobalStyle } from './styles';
import store from './store';
import './static/fonts/fonts.css';

const Root = () => (
  <React.Fragment>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);

// @ts-ignore
window.store = store;

ReactDOM.render(<Root />, document.getElementById('root'));
