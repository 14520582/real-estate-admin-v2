import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from './directives/directives';
import { PipesModule } from './pipes/pipes.module';
import { SearchBarModule} from './search-bar/search-bar.module';


@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBarModule,
        FlexLayoutModule,

        DirectivesModule,
        PipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        DirectivesModule,
        PipesModule
    ]
})
export class SharedModule
{
}
