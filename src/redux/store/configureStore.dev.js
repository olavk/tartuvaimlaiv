import {createStore, compose} from 'redux';
import middleware from './middleware';

const devTools = [];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
const enhancer = compose(
  middleware,
  ...devTools,
);

export default function configureStore(rootReducer, initialState) {
  if (typeof rootReducer !== 'function') {
    throw new Error('configureStore requires a function for rootReducer as first argument');
  }
  return createStore(rootReducer, initialState, enhancer);
}
