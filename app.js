import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter as Router, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './src/store/reducers'
import DevTools from './src/containers_components/_DevTools'

import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'

import MainContainer from './src/MainContainer'

const history = createHistory()
const middleware = routerMiddleware(history)
const appMiddlewares = [thunk, middleware]
const persistedState = loadState()

// ========================================
// When the environment is development
// ========================================
if (process.env.NODE_ENV != 'production') {
  const enhancer = compose(
    applyMiddleware(...appMiddlewares),
    DevTools.instrument()
  )

  const store = createStore(
    reducer,
    persistedState,
    enhancer
    // applyMiddleware(...appMiddlewares) //already pured to enhancer
  )

  store.subscribe(throttle(() => {
    saveState({
      Auth: store.getState().Auth
    })
  }, 1000))

  var renderApp = component => (
    ReactDOM.render(
      <Provider store={store}>
      <AppContainer>
          <div>
            <Router history={history}>
              <Route component={component} />
            </Router>
            {/* <DevTools /> */}
          </div>
        </AppContainer>
      </Provider>,
      document.getElementById('root')
    )
  );
}
// ========================================
// Else if the environment is production
// ========================================
else {
  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...appMiddlewares)
  )

  store.subscribe(throttle(() => {
    saveState({
      Auth: store.getState().Auth
    })
  }, 1000))

  var renderApp = component => (
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Router history={history}>
            <Route component={component} />
          </Router>
        </AppContainer>
      </Provider>,
      document.getElementById('root')
    )
  );
}


renderApp(MainContainer);

if (module.hot) {
  module.hot.accept('./src/App', () => {
    const NextApp = require('./src/MainContainer').default;
    //const newRoute = require('./routes').default;
    if (process.env.NODE_ENV != 'production') console.info("You are in development environment. Accepting change in App file...");
    renderApp(NextApp);
  });
}
