import thunk from 'redux-thunk';
import  promise  from 'redux-promise'
import  multi  from 'redux-multi'
import { applyMiddleware, createStore } from 'redux'
import root from '../store/root'

let devTools = undefined;
if (process.env.NODE_ENV === "development") {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}


const store = applyMiddleware(thunk, multi, promise)(createStore)(
    root,
    devTools
);

export default store