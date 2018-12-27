import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Animations} from '../../../animations/aminations';
import {ConfigService} from '../../../services/ui.config.service';

@Component({
  selector: 'app-nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : Animations
})
export class NavHorizontalCollapseComponent implements OnDestroy
{
    onConfigChanged: Subscription;
    fuseSettings: any;
    isOpen = false;

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private fuseConfig: ConfigService
    )
    {
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
