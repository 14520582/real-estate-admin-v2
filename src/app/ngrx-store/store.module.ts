import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { reducers, State } from './index';

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

@NgModule({
    imports  : [
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? [] : [],
    ],
    providers: [
    ]
})

export class AppStoreModule
{
}
