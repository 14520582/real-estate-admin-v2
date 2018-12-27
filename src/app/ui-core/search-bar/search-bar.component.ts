import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService} from '../services/ui.config.service';


@Component({
    selector   : 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class SearchBarComponent
{
    collapsed: boolean;
    toolbarColor: string;
    @Output() onInput: EventEmitter<any> = new EventEmitter();
    onConfigChanged: Subscription;

    constructor(
        private config: ConfigService
    )
    {
        this.collapsed = true;
        this.onConfigChanged =
            this.config.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.toolbarColor = newSettings.colorClasses.toolbar;
                    }
                );
    }

    collapse()
    {
        this.collapsed = true;
    }

    expand()
    {
        this.collapsed = false;
    }

    search(event)
    {
        const value = event.target.value;

        this.onInput.emit(value);
    }

}
