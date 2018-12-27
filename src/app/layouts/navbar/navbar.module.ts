import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { SharedModule} from '../../ui-core/shared.module';
import {NavigationModule} from '../../ui-core/navigation/navigation.module';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';


@NgModule({
    declarations: [
        NavbarComponent,

    ],
    imports: [
        SharedModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        NavigationModule
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
