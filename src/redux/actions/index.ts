import { Types } from '../types/types';
import { CellTypes } from '../cellInterface';

export type Direction = 'up' | 'down';

export interface moveCellAction {
  type: Types.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface deleteCellAction {
  type: Types.DELETE_CELL;
  payload: string;
}

export interface insertCellBeforeAction {
  type: Types.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    // the type of cell - this is coming from our cell Interface file
    type: CellTypes;
  };
}

export interface updateCellAction {
  type: Types.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action = moveCellAction | deleteCellAction | insertCellBeforeAction | updateCellAction;
