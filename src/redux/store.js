import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducers';
import thunk from 'redux-thunk'; //用于支持异步action
import { composeWithDevTools } from 'redux-devtools-extension';

//暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
