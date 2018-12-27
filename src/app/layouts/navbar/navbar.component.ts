import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { navigation } from './navigation/navigation';
import {PerfectScrollbarDirective} from '../../ui-core/directives/perfect-scrollbar/perfect-scrollbar.directive';
import { SidebarService} from '../../ui-core/sidebar/sidebar.service';
import {NavigationService} from '../../ui-core/navigation/navigation.service';
import { Store } from '@ngrx/store';
import * as reducers from '../../ngrx-store/reducers';
import * as actions from '../../ngrx-store/actions';
import { Observable } from 'rxjs';

@Component({
    selector     : 'app-navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class  NavbarComponent implements OnInit, OnDestroy {
    menu = 'close' ;
    private perfectScrollbar: PerfectScrollbarDirective;
    @ViewChild(PerfectScrollbarDirective) set directive(theDirective: PerfectScrollbarDirective)
    {
      if ( !theDirective ){
        return;
      }

      this.perfectScrollbar = theDirective;
      this.navigationServiceWatcher = this.navigationService.onItemCollapseToggled.subscribe(() => {
        this.perfectScrollbarUpdateTimeout = setTimeout(() => {
          this.perfectScrollbar.update();
          }, 310);
      });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    perfectScrollbarUpdateTimeout;
    isExpand;
    constructor(
        private sidebarService: SidebarService,
        private navigationService: NavigationService,
        private router: Router,
        private store: Store<reducers.State>
    )
    {
        // Navigation data
        this.navigation = navigation
        // Default layout
        this.layout = 'vertical';

    }

    ngOnInit()
    {
    }

    ngOnDestroy()
    {
      if (this.perfectScrollbarUpdateTimeout)
        {
          clearTimeout(this.perfectScrollbarUpdateTimeout);
        }

        if ( this.navigationServiceWatcher )
        {
            this.navigationServiceWatcher.unsubscribe();
        }
    }

    toggleSidebarOpened()
    {
        this.sidebarService.getSidebar('navbar').toggleOpen();
    }

    toggleSidebarFolded()
    {
      this.sidebarService.getSidebar('navbar').toggleFold();
        if (this.menu !== 'menu') {
          this.menu = 'menu';
        } else {
          this.menu = 'clear';
        }

    }
}
