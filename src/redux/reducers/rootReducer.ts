import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundlesReducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default rootReducer;

// type that describes the type of state inside our redux store - this is for the useTypedSelector or useSelectors
export type RootState = ReturnType<typeof rootReducer>;
