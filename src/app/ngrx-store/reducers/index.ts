import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';

import * as navBarReducer from './navbar.reducer';

export interface NavBarState
{
    isExpand: boolean;
}

export interface State
{
    navBarState: NavBarState;
}

export const reducers: ActionReducerMap<State> = {
    navBarState: navBarReducer.reducer
};


export const getNavBarState = createFeatureSelector<NavBarState>('navBarState');
export const getIsExpand = createSelector(
    getNavBarState,
    (state: NavBarState) => state.isExpand
);
