import { createStore,applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from '../sagas/index';

const sagaMiddleware = createMiddlewareSaga();

const configStore = (initial) => {
    let store =  createStore(rootReducer, initial, applyMiddleware(thunk, createLogger(),sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configStore;



