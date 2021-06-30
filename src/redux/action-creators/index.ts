import { Types } from '../types/types';
import { Dispatch } from 'redux';
import { moveCellAction, deleteCellAction, insertCellAfterAction, updateCellAction, Direction, Action } from '../actions';
// action is the "Union" of all our different actions, but we cannot access the individual action interfaces with that Action import
import { CellTypes } from '../cellInterface';
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): updateCellAction => {
  return {
    type: Types.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): deleteCellAction => {
  return {
    type: Types.DELETE_CELL,
    payload: id,
  };
};

// direction is a defined type inside of our actions file
export const moveCell = (id: string, direction: Direction): moveCellAction => ({
  type: Types.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellAfter = (id: string | null, cellType: CellTypes): insertCellAfterAction => ({
  type: Types.INSERT_CELL_AFTER,
  payload: {
    id: id,
    type: cellType,
  },
});

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Types.BUNDLE_START,
      payload: {
        cellId: cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: Types.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          error: result.error,
        },
      },
    });
  };
};
