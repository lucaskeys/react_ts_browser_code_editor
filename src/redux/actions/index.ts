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

export interface insertCellAfterAction {
  type: Types.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
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

export interface bundleStartAction {
  type: Types.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface bundleCompleteAction {
  type: Types.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export type Action = moveCellAction | deleteCellAction | insertCellAfterAction | updateCellAction | bundleStartAction | bundleCompleteAction;
