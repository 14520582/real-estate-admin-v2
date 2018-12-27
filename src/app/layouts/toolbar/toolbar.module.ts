import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDividerModule,
  MatBadgeModule
} from '@angular/material';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule} from '../../ui-core/shared.module';
import { SearchBarModule} from '../../ui-core/search-bar/search-bar.module';
import { ShortcutsModule} from '../../ui-core/shortcuts/shortcuts.module';
import { AvatarModule } from 'ngx-avatar';



@NgModule({
    declarations: [
        ToolbarComponent,

    ],
    imports     : [
        RouterModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,
        SharedModule,
        SearchBarModule,
        ShortcutsModule,
        MatInputModule,
        AvatarModule,
        MatDividerModule,
        MatBadgeModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
