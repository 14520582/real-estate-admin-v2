import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  data: any;
  zoom: number = 18;
  lat: number = 10.8096243;
  lng: number = 106.6942763;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {
    this.route.params.subscribe(params => {
      this.propertyService.getById(params.id).subscribe(dt => {
        this.data = dt;
        // const address = dt.address.no + '+' + dt.address.street + ',+' + dt.address.ward.name + ',+' + dt.address.district.name + ',+' + dt.address.city.name;
        // this.propertyService.getLatLngFromAddress(address).subscribe(result => {
        //   console.log(result)
        //   if (result.Response.View.length > 0) {
        //     this.lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
        //     this.lng = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        //   }
          

        // });
      });
    });
  }

  ngOnInit() {
  }

  getType(value: number, args: number): any {
    switch (value) {
      case 0:
        return 'Nhà riêng'
      case 1:
        if (args === 0)
          return 'Đất nền'
        if (args === 1)
          return 'Mặt bằng'
        return 'Đất nền/Mặt bằng'
      case 2:
        return 'Chung cư'
      default:
        return '--'
    }
  }
}
