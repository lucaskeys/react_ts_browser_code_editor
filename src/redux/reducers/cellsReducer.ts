import produce from 'immer';
import { Types } from '../types/types';
import { Action } from '../actions';
import { Cell } from '../cellInterface';

interface CellsState {
  loading: boolean;
  error: string | null;
  // this will be the id of each cell in this array
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const INITIAL_STATE: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// we annotate the state type to make sure we try access any property on state that doesnt exist
// this function will return state of type cellReducerState
// wrap in produce - produce takes another function as an argument
const cellsReducer = produce((state: CellsState = INITIAL_STATE, action: Action): CellsState => {
  // with immer, we are no longer returning anything, as we are just updating state directly, so we can specify returning a CellReduderState type or nothing at all
  switch (action.type) {
    case Types.UPDATE_CELL:
      const { id, content } = action.payload;
      // with immer
      // finding the appropriate cell in our data object via the id as the key - then access content property and assign new value
      state.data[id].content = content;
      return state;
    // return {
    //   ...state,
    //   data: {
    //     ...state.data,
    //     [id]: {
    //       ...state.data[id],
    //       content,
    //     },
    //   },
    // };

    case Types.DELETE_CELL:
      delete state.data[action.payload];
      // deleting it out of the order array as well
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case Types.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      // this is just trying to find the target index of either up one or down 1 in the array of ordered cells
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;

    case Types.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((id) => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
      return state;

    default:
      return state;
  }
  // need to put INITIAL_STATE as second argument
}, INITIAL_STATE);

const randomId = () => {
  // base36 means it will use a combination of letters and numbers 1-9
  // substring is very similar to splice
  return Math.random().toString(36).substr(2, 5);
};

export default cellsReducer;
