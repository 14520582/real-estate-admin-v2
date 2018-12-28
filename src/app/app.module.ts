import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
import { layoutConfig } from './layout-config';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { MainModule } from './layouts/main.module';
import { AppStoreModule } from './ngrx-store/store.module';
import {UiCoreModule} from './ui-core/ui.core.module';
import {SharedModule} from './ui-core/shared.module';
import { PropertyService } from './services/property.service';
import { ConfigurationService } from './services/app-jssip/services/configuration.service';
import { NewsService } from './services/news.service';
import { LoggerService } from './services/app-jssip/services/logger.service';
import { LoadGuardService} from './components/login/can-load.service';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  {
    path: 'manager-property',
    loadChildren: './components/manager-property/manager-property.module#ManagerPropertyModule',
    canLoad: [LoadGuardService],
  },
  {
    path: 'news-manager',
    loadChildren: './components/news-manage/news-manage.module#NewsManagerModule',
    canLoad: [LoadGuardService],
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'post-property',
    loadChildren: './components/post-page/post-page.module#PostPageModule'
  },
  {
    path: '**',
    redirectTo: 'manager-property'
  }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        UiCoreModule.forRoot(layoutConfig),
        SharedModule,
        AppStoreModule,
        MainModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      PropertyService,
      NewsService,
      AuthService,
      LoadGuardService,
      LoggerService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    ]
})
export class AppModule {
}
