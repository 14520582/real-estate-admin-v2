import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewChild, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import { ConfigService } from '../ui-core/services/ui.config.service';
import { CallDialogComponent } from '../components/call-dialog/call-dialog.component';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../services/app-jssip/services/logger.service';
import { UaService } from '../services/app-jssip/services/ua.service';
import { ConfigurationStoreService } from '../services/app-jssip/services/configuration-store.service';
import { ConfigurationService } from '../services/app-jssip/services/configuration.service';

@Component({
    selector     : 'app-main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss']
})
export class MainComponent implements OnDestroy, OnInit
{
    @ViewChild('chatView') chatView: ElementRef;
    onConfigChanged: Subscription;
    settings: any;
    isExpanded = false;
    @HostBinding('attr.app-layout-mode') layoutMode;
    text: FormControl
    messageList = [{
        source: 'agent',
        content: 'Chào bạn đến với FindHouse bạn cần chúng tôi tư vấn gì?'
    }]
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private matDialog: MatDialog,
        private config: ConfigService,
        private platform: Platform,
        public loggerService: LoggerService,
        private configuration: ConfigurationService,
        public configDialog: MatDialog,
        private configurationStore: ConfigurationStoreService,
        public UA: UaService,
        @Inject(DOCUMENT) private document: any
    )
    {
        this.onConfigChanged =
            this.config.onConfigChanged
                .subscribe(
                    (newSettings) => {
                      this.settings = newSettings;
                      this.layoutMode = this.settings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
        this.text = new FormControl();
    }
    scrollToBottom(): void {
        try {
            setTimeout(() => {
                this.chatView.nativeElement.scrollTop = this.chatView.nativeElement.scrollHeight;
            }, 800)
        } catch(err) { }                 
    }
    ngOnInit() {
        this.configurationStore.applyConfiguration().subscribe(ret => {
            if (this.configuration.autoconnect) {
              this.UA.connect();
            }
          });
          this.loggerService.log.subscribe(message => {
            if(message) {
                this.messageList.push({source: 'agent', content: message}); 
                this.scrollToBottom();
            }
        })
    }
    openCallDialog(){
        this.matDialog.open(CallDialogComponent).disableClose = true;
    }
    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();

    }
    sendMessage() {
        if (this.text.value.trim()) {
            this.messageList.push({source: 'me', content: this.text.value});
            this.UA.sendMsg('1012', this.text.value);
            this.scrollToBottom();
            this.text.setValue('');
        }
    }
    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
