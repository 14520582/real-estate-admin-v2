import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { SearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        SearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        SearchBarComponent
    ]
})
export class SearchBarModule
{
}
