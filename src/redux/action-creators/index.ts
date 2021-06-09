import { Types } from '../types/types';
import { moveCellAction, deleteCellAction, insertCellBeforeAction, updateCellAction, Direction } from '../actions';
// action is the "Union" of all our different actions, but we cannot access the individual action interfaces with that Action import
import { CellTypes } from '../cellInterface';

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

export const insertCell = (id: string, cellType: CellTypes): insertCellBeforeAction => ({
  type: Types.INSERT_CELL_BEFORE,
  payload: {
    id: id,
    type: cellType,
  },
});
