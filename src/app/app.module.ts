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


const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './components/home/home.module#HomeModule'
  },
  {
    path: 'properties-list',
    loadChildren: './components/properties-list/properties-list.module#PropertiesListModule'
  },
  {
    path: 'property-details',
    loadChildren: './components/property-details/property-details.module#PropertyDetailsModule'
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'contact',
    loadChildren: './components/contact/contact.module#ContactModule'
  },
  {
    path: 'about',
    loadChildren: './components/about/about.module#AboutModule'
  },
  {
    path: 'post',
    loadChildren: './components/post-page/post-page.module#PostPageModule'
  },
  {
    path: 'news-details',
    loadChildren: './components/news-details/news-details.module#NewsDetailsModule'
  },
  {
    path: 'news-list',
    loadChildren: './components/news-list/news-list.module#NewsListModule'
  },
  {
    path: 'price-map',
    loadChildren: './components/price-map/price-map.module#PriceMapModule'
  },
  {
    path: '**',
    redirectTo: 'home'
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
      LoggerService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    ]
})
export class AppModule
{
}
