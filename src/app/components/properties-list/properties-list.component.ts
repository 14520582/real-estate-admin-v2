import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PageEvent } from '@angular/material';
import { CONSTANT } from '../../common/constant';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  totalOfItems: number = 0;
  filter: string;
  data = [];
  zoom: number = 11;
  lat: number = 10.7553411;
  lng: number = 106.4150244;
  markList = [];
  pageSize = CONSTANT.PAGE_SIZE_FILTER;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.filter = params.content;
      this.loadData(0);
    });
    
  }
  onPaginateChange(event: PageEvent) {
    this.loadData(event.pageIndex);
  }
  clickedMarker(id) {
    this.router.navigate(['property-details/', id])
  }
  loadData(pageIndex) {
    this.propertyService.filter(this.filter, pageIndex).subscribe( data => {
      this.data = data.content;
      this.totalOfItems = data.totalElements;
      this.markList = [];
      // if(data.content.length > 0 && this.filter.includes('district') && pageIndex === 0) {
      //   this.propertyService.getLatLngFromAddress(data.content[0].address.district.name + ',+' + data.content[0].address.city.name).subscribe(result => {
      //     if (result.Response.View.length > 0) {
      //       this.lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      //       this.lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      //     }
      //   });
      //   this.zoom = 13;
      // }
      // for(let i = 0; i < data.content.length; i++) {
      //   const dt = data.content[i];
      //   const address = dt.address.no + '+' + dt.address.street + ',+' + dt.address.ward.name + ',+' + dt.address.district.name + ',+' + dt.address.city.name;
      //   this.propertyService.getLatLngFromAddress(address).subscribe(result => {
      //     if (result.Response.View.length > 0) {
      //       const lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      //       const lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      //       this.markList.push({id: data.content[i].id, lat: lat, lng: lng})
      //     }
      //   });
      // }
      window.scroll(0,0);
    })
  }

}
