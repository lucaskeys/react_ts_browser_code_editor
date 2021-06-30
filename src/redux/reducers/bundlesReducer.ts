import produce from 'immer';
import { Types } from '../types/types';
import { Action } from '../actions';
import { types } from 'jscodeshift';

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const INITIAL_STATE: BundleState = {};

const bundleReducer = produce((state: BundleState = INITIAL_STATE, action: Action): BundleState => {
  switch (action.type) {
    case Types.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        error: '',
      };
      return state;
    case Types.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
      return state;
    default:
      return state;
  }
}, INITIAL_STATE);

export default bundleReducer;
