import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Call } from './ua.service/call';
import * as moment from 'moment';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class LoggerService {
  public log: BehaviorSubject<any>;
  public call = new BehaviorSubject(new Call());
  constructor() { 
    this.log = new BehaviorSubject(null);
  }

  addLog(message: any) {
      this.log.next(message);
  }
  clearLog() {
    // this._logs = [];
  }
}
