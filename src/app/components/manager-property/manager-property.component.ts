import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormControl } from '@angular/forms';
import { CONSTANT } from '../../common/constant';
import { PageEvent, MatDialog, MatSnackBar } from '@angular/material';
import { EditPropertyComponent } from '../edit-property-dialog/edit-property-dialog.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
  deleteProperty(id, index) {
    this.data.splice(index, 1);
    this.propertyService.deleteProperty(id).subscribe(dt => {
      console.log(dt);
    })
  }
  clearText() {
    this.searchText = '';
    this.loadData(0);
  }
  searchByText() {
    console.log(parseInt(this.searchText))
    this.propertyService.filterByText(parseInt(this.searchText), 0).subscribe( data => {
      this.data = data.content;
      this.totalOfItems = data.totalElements;
    })
  }
  openEdit(item, index) {
    const ref = this.dialog.open(EditPropertyComponent, {
      data: {item: item},
      disableClose: false
    });
    ref.afterClosed().subscribe( res => {
      if(res) {
        console.log(res)
        const snack = this.snackBar.open('Đang cập nhật...');
        this.propertyService.updateProperty({...item, ...res}).pipe(
          catchError (err => {
            snack.dismiss()
            return throwError(err);
          })
        )
        .subscribe( data => {
          this.data[index] = data;
          snack.dismiss()
        })
      }
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
