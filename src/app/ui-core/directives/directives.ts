import { NgModule } from '@angular/core';
import {IfOnDomDirective} from './if-on-dom/if-on-dom.directive';
import {MatSidenavHelperDirective, MatSidenavTogglerDirective} from './mat-sidenav/mat-sidenav.directive';
import {PerfectScrollbarDirective} from './perfect-scrollbar/perfect-scrollbar.directive';

@NgModule({
    declarations: [
        IfOnDomDirective,
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        PerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        IfOnDomDirective,
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        PerfectScrollbarDirective
    ]
})
export class DirectivesModule
{
}
