import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../../ui-core/shared.module';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        SharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
