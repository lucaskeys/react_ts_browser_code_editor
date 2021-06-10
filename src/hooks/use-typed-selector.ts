import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux';

//  we use this to access state inside our components
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
