import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './util/auth';
import makeStore from './util/makeStore';

const store = makeStore();

store.dispatch(async dispatch => {
  console.log('dispatched');

  try {
    const result = await Auth.handleAuthentication();
    console.log('logged in', result);
    dispatch({ type: 'LOGGED_IN', payload: result });
  } catch (error) {
    console.error('failed to auth', error);
    dispatch({ type: 'LOGGED_OUT' });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
