import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import logger from './middleware/logger.middleware';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlwares = [sagaMiddleware, logger];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlwares))
);

sagaMiddleware.run(rootSaga);

export default store;
