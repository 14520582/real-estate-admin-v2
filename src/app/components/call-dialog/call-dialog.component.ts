import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfigurationService } from '../../services/app-jssip/services/configuration.service';
import { CallspollService } from '../../services/app-jssip/services/callspoll.service';
import { UaService } from '../../services/app-jssip/services/ua.service';
import { ConnectionStatus } from '../../common/core-utils';
import { Observable } from 'rxjs/Observable';
import { ConfigurationStoreService } from '../../services/app-jssip/services/configuration-store.service';
import { Call } from '../../services/app-jssip/services/ua.service/call';
import { filter, map, takeWhile, scan } from 'rxjs/operators';
import { UAnewRTCSessionData, UAMessage, UAregisteredData } from '../../services/app-jssip/ua-utils';
import { ConfigComponent } from '../config/config.component';
@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss']
})
export class CallDialogComponent implements OnInit, OnDestroy {
  public connectionStatus: Observable<ConnectionStatus>;
  private alive = false;
  call = new Call();
  constructor(
    private ref: MatDialogRef<CallDialogComponent>,
    private configuration: ConfigurationService,
    public configDialog: MatDialog,
    private configurationStore: ConfigurationStoreService,
    private callsPool: CallspollService,
    public UA: UaService,
  ) {
  }

  public ngOnInit(): void {
    this.alive = true;
    this.connectionStatus = this._generateConnectionStatusFeed();

    // Manage incoming/outgoing calls
    this.UA.notifier.pipe(
      filter(uaMsg => uaMsg.event === 'newRTCSession'),
      map(uaMsg => uaMsg.data),
      takeWhile(() => this.alive)
    )
      .subscribe((rtcData: UAnewRTCSessionData) => {

        this.call = new Call();
        this.call.setSession(rtcData);
        this.callsPool.addCall(this.call);
      });
  }
  makeCall(isConnected = null) {
    if (!isConnected) {
        return;
    }
    this.UA.call('1014', false);
  }
  hangUp () {
    this.call.hangup();
  }
  private _generateConnectionStatusFeed(): Observable<ConnectionStatus> {

    return this.UA.notifier.pipe(
      filter(
        (message: UAMessage) => ['registered', 'disconnected'].indexOf(message.event) !== -1
      ),
      map((message: UAMessage) => {

        const status: ConnectionStatus = {
          who: 'not registered',
          last: new Date()
        };
        if (message.event === 'registered') {
          const messageData = <UAregisteredData>message.data;
          status.who = messageData.response['from']['uri']['user'];
        }
        return status;
      }),
      scan((acc, cur) => {
        return { ...acc, ...cur };
      }));
  }
  openConfigurationManager(){
    let dialogRef = this.configDialog.open(ConfigComponent);
  }
  public ngOnDestroy() {
    this.alive = false;
  }
  close() {
    this.ref.close()
    if(this.call.living)
      this.call.hangup()
  }
}
