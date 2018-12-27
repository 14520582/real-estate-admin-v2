import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatSlideToggleModule, MatExpansionModule, MatInputModule } from '@angular/material';
import { FooterModule } from './footer/footer.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainComponent } from './main.component';
import { SharedModule} from '../ui-core/shared.module';
import { ContentModule} from '../components/content.module';
import {SearchBarModule} from '../ui-core/search-bar/search-bar.module';
import {ShortcutsModule} from '../ui-core/shortcuts/shortcuts.module';
import {SidebarModule} from '../ui-core/sidebar/sidebar.module';
import { CallDialogComponent } from '../components/call-dialog/call-dialog.component';
import { ConfigComponent } from '../components/config/config.component';
import { AppJssipModule } from '../services/app-jssip/app-jssip.module';


@NgModule({
    declarations: [
        MainComponent,
        CallDialogComponent,
        ConfigComponent
    ],
    imports     : [
        RouterModule,
        MatSidenavModule,
        SharedModule,
        SearchBarModule,
        ShortcutsModule,
        MatButtonModule,
        MatIconModule,
        SidebarModule,
        ContentModule,
        MatInputModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDialogModule,
        FooterModule,
        ToolbarModule,
        AppJssipModule
    ],
    entryComponents: [CallDialogComponent, ConfigComponent],
    exports     : [
        MainComponent
    ]
})
export class MainModule
{
}
