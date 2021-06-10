import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { Types } from './types/types';

const middlewares = [thunk];

export const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

store.dispatch({
  type: Types.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: Types.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text',
  },
});

store.dispatch({
  type: Types.DELETE_CELL,
  payload: 'avxfv',
});

console.log(store.getState());
