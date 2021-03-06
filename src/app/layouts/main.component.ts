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
import { AuthService } from '../services/auth.service';

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
    selectedTab = 0;
    hiddenChatBx = true;
    @HostBinding('attr.app-layout-mode') layoutMode;
    text: FormControl;
    messageList = [];
    sub: Subscription;
    isLogged = false;
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private matDialog: MatDialog,
        private config: ConfigService,
        private platform: Platform,
        private authService: AuthService,
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
        this.authService.logged.subscribe( logged => {
            this.isLogged = logged;
        })
    }
    scrollToBottom(): void {
        try {
            setTimeout(() => {
                this.chatView.nativeElement.scrollTop = this.chatView.nativeElement.scrollHeight;
            }, 800)
        } catch(err) { }                 
    }
    ngOnInit() {
      this.sub = this.configurationStore.applyConfiguration().subscribe(ret => {
        if (this.configuration.autoconnect) {
          this.UA.connect();
          this.sub.unsubscribe();
        }
      });
          this.loggerService.log.subscribe(message => {
            if(message) {
                // this.messageList.push({source: 'agent', content: message});
                let newSource = true;
                for(let i = 0; i < this.messageList.length; i++) {
                    if (this.messageList[i].address === message.source) {
                        this.messageList[i].message.push({source: 'customer', content: message.content})
                        newSource = false;
                        break;
                    }
                }
                if (newSource) {
                    this.messageList.push({address: message.source, message: [{source: 'customer', content: message.content}]});
                }
                this.scrollToBottom();
            }
        })
    }
    changeTab(index) {
        this.selectedTab = index;
        console.log('aa')
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
            this.messageList[this.selectedTab].message.push({source: 'me', content: this.text.value});
            console.log(this.messageList[this.selectedTab].address)
            this.UA.sendMsg(this.messageList[this.selectedTab].address, this.text.value);
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
