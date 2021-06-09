import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
});

export default rootReducer;

// type that describes the type of state inside our redux store
export type RootState = ReturnType<typeof rootReducer>;
