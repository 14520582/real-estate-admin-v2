import {Component} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ConfigService} from '../../ui-core/services/ui.config.service';
import { SidebarService} from '../../ui-core/sidebar/sidebar.service';
import { Store } from '@ngrx/store';
import * as reducers from '../../ngrx-store/reducers';
import { AuthService } from '../../services/auth.service';

@Component({
    selector   : 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss'],
})

export class ToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;
    navigation: any;
    expandNavbar: boolean;
    constructor(
      private router: Router,
      private config: ConfigService,
      private authService: AuthService,
      private sidebarService: SidebarService,
      private store: Store<reducers.NavBarState>
    )
    {
        this.router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

      this.config.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });

        this.store.select(reducers.getIsExpand).subscribe(data => {
            this.expandNavbar = data
        })

    }
    goHome() {
        this.router.navigate(['/'])
    }
    logout() {
        localStorage.clear();
        this.authService.logged.next(false);
        this.router.navigate(['/login/']);
    }
}
