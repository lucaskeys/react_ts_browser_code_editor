import produce from 'immer';
import { Types } from '../types/types';
import { Action } from '../actions';
import { Cell } from '../cellInterface';

interface CellReducerState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const INITIAL_STATE: CellReducerState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// we annotate the state type to make sure we try access any property on state that doesnt exist
// this function will return state of type cellReducerState
// wrap in produce - produce takes another function as an argument
const cellsReducer = produce((state: CellReducerState = INITIAL_STATE, action: Action): CellReducerState => {
  switch (action.type) {
    case Types.UPDATE_CELL:
      const { id, content } = action.payload;

      // with immer
      // state.data[id].content = content;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };

    case Types.DELETE_CELL:
      return state;
    case Types.MOVE_CELL:
      return state;
    case Types.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
});

export default cellsReducer;
