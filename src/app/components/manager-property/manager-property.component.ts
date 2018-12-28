import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormControl } from '@angular/forms';
import { CONSTANT } from '../../common/constant';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './manager-property.component.html',
  styleUrls: ['./manager-property.component.scss']
})
export class ManagerPropertyComponent implements OnInit {
  totalOfItems: number = 0;
  pageSize = CONSTANT.PAGE_SIZE_FILTER;
  searchText= '';
  filter = '';
  data = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {
  }
  onPaginateChange(event: PageEvent) {
    this.loadData(event.pageIndex);
  }
  ngOnInit() {
    this.route.params.subscribe( params => {
      this.filter = params.content;
      this.loadData(0);
    });
  }
  loadData(pageIndex) {
    this.propertyService.filter(this.filter, pageIndex).subscribe( data => {
      console.log(data);
      this.data = data.content;
      this.totalOfItems = data.totalElements;
    })
  }
}
