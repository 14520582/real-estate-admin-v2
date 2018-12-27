
import { NavBarAction, NavBarActionTypes } from '../actions/navbar.action';
import { NavBarState } from './index';
export const initialState: NavBarState = { isExpand: true };

export function reducer(state = initialState, action: NavBarAction): NavBarState {
  switch (action.type) {
    case NavBarActionTypes.EXPAND: {
      return {
        ...state,
        isExpand: true
      };
    }
    case NavBarActionTypes.COLLAPSE: {
        return {
            ...state,
            isExpand: false
        };
    }
    default: {
      return state;
    }
  }
}