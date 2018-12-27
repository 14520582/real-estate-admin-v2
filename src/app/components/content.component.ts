import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {Animations} from '../ui-core/animations/aminations';
import {ConfigService} from '../ui-core/services/ui.config.service';


@Component({
    selector   : 'app-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : Animations
})
export class ContentComponent implements OnDestroy
{
    onConfigChanged: Subscription;
    fuseSettings: any;

    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fuseConfig: ConfigService
    )
    {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute)
        ).subscribe((event) => {
            switch ( this.fuseSettings.routerAnimation )
            {
                case 'fadeIn':
                    this.routeAnimationFade = !this.routeAnimationFade;
                    break;
                case 'slideUp':
                    this.routeAnimationUp = !this.routeAnimationUp;
                    break;
                case 'slideDown':
                    this.routeAnimationDown = !this.routeAnimationDown;
                    break;
                case 'slideRight':
                    this.routeAnimationRight = !this.routeAnimationRight;
                    break;
                case 'slideLeft':
                    this.routeAnimationLeft = !this.routeAnimationLeft;
                    break;
            }
        });

        this.onConfigChanged =
            this.fuseConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }
}
