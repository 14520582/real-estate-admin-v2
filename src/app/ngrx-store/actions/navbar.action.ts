import { Action } from '@ngrx/store';

export enum NavBarActionTypes {
    EXPAND = '[Navbar] Expand',
    COLLAPSE = '[Navbar] Collapse'
}
export class Expand implements Action {
    readonly type = NavBarActionTypes.EXPAND;
}
  
export class Collapse implements Action {
    readonly type = NavBarActionTypes.COLLAPSE;
}

export type NavBarAction = Expand | Collapse;
