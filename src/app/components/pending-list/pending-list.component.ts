import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANT } from '../../common/constant';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
import {PendingService} from '../../services/pending.service';
@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {
  data = [];
  constructor(
    private router: Router,
    private pendingService: PendingService
  ) {

  }

  ngOnInit() {
    this.pendingService.getAllData().subscribe( data => {
      this.data = data;
    });
  }
}
