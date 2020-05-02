import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import  { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance } from 'redux-firestore'
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

const middlewares = [
  thunk.withExtraArgument(getFirebase)
]

const initialState = window && window.__INITIAL_STATE__

const rfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableClaims: true
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
  )
)

const BaseApp = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={fbConfig}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(
  <BaseApp />,
  document.getElementById('root')
);

serviceWorker.register();
