import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {CONFIG, ConfigService} from './services/ui.config.service';
import { MatchMediaService } from './services/match-media.service';
import { MatSidenavHelperService } from './directives/mat-sidenav/mat-sidenav.service';
import {NavigationService} from './navigation/navigation.service';
import { SidebarService } from './sidebar/sidebar.service';
import { SplashScreenService } from './services/splash-screen.service';
import { TranslationLoaderService } from './services/translation-loader.service';


@NgModule({
    entryComponents: [],
    providers      : [
        ConfigService,
        // CopierService,
        MatchMediaService,
        MatSidenavHelperService,
        NavigationService,
        SidebarService,
        SplashScreenService,
        TranslationLoaderService
    ]
})
export class UiCoreModule
{
    constructor(@Optional() @SkipSelf() parentModule: UiCoreModule)
    {
        if ( parentModule )
        {
            throw new Error('UiCoreModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : UiCoreModule,
            providers: [
                {
                  provide: CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
