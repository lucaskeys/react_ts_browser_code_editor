import { useMemo } from 'react';
// memo is used to bind our action creators only one time - prevents infinite loops when components render
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

// example to use these actions now
// const { updateCell } = useActions;

// updateCell();
