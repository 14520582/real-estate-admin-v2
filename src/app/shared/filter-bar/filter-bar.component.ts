import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { DATA } from '../../common/data';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  cities: string[];
  wards: any[];
  types: number[];
  districts: any[];
  floors: string[];
  directions: string[];
  filterForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private propertyService: PropertyService
  ) {
    this.cities = DATA.cities;
    this.types = DATA.types;
    this.floors = DATA.floors;
    this.directions= DATA.directions;
  }
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      city: [1, Validators.required],
      district: [-1, Validators.required],
      ward: [-1, Validators.required],
      type: [-1, Validators.required],
      price: [0, Validators.required],
      area: [0, Validators.required],
      form: [-1, Validators.required],
      floor: [-1, Validators.required],
      direction: [-1, Validators.required],
      numberOfBedRoom: [-1, Validators.required],
      numberOfBathRoom: [-1, Validators.required]
    });
    this.propertyService.getDistrictByCity(1).subscribe(dis => {
      this.districts = dis;
    })
  }
  getPriceFilter(value) {
    if(value === 0)
      return 'Tất cả'
    if(value === 10)
      return '> 10 tỷ'
    return '< ' + value +' tỷ';
  }
  getAreaFilter(value) {
    if(value === 0)
      return 'Tất cả'
    return '< ' + value +' m²';
  }
  changeDistrict() {
    this.propertyService.getWardByDistrict(this.filterForm.controls['district'].value).subscribe( w => {
      this.wards = w;
      this.filterForm.controls['ward'].setValue(-1)
    })
  }
  getType(type) {
    switch (type) {
      case 0:
        return 'Nhà riêng'
      case 1:
        return 'Đất nền/Mặt bằng'
      case 2:
        return 'Chung cư'
      default:
        return '--'
      }
  }
  filter() {
    if (this.filterForm.dirty){
      console.log('filtering')
      let content = '';
      content += 'city:' + this.filterForm.controls['city'].value
      if(this.filterForm.controls['form'].value !== -1)
        content += ',form:' + this.filterForm.controls['form'].value
      if(this.filterForm.controls['district'].value !== -1)
        content += ',district:' + this.filterForm.controls['district'].value
      if(this.filterForm.controls['ward'].value !== -1)
        content += ',ward:' + this.filterForm.controls['ward'].value
      if(this.filterForm.controls['floor'].value !== -1)
        content += ',numoffloor:' + this.filterForm.controls['floor'].value
      if(this.filterForm.controls['direction'].value !== -1)
        content += ',direction:' + this.filterForm.controls['direction'].value
      if(this.filterForm.controls['numberOfBedRoom'].value !== -1){
        if(this.filterForm.controls['numberOfBedRoom'].value == 4)
          content += ',numofbedroom>' + this.filterForm.controls['numberOfBedRoom'].value
        else
          content += ',numofbedroom:' + this.filterForm.controls['numberOfBedRoom'].value
      }
      if(this.filterForm.controls['numberOfBathRoom'].value !== -1){
        if(this.filterForm.controls['numberOfBathRoom'].value == 4)
          content += ',numofbathroom>' + this.filterForm.controls['numberOfBathRoom'].value
        else
          content += ',numofbathroom:' + this.filterForm.controls['numberOfBathRoom'].value
      }
      if(this.filterForm.controls['area'].value !== 0){
          content += ',area<' + this.filterForm.controls['area'].value
      }
      if(this.filterForm.controls['price'].value !== 0){
        if(this.filterForm.controls['price'].value == 10)
          content += ',price>' + this.filterForm.controls['price'].value*1000000
        else
          content += ',price<' + this.filterForm.controls['price'].value*1000000
      }
      if(content !== '')
        this.router.navigate(['/properties-list/', {content: content}]);
    }else{
      console.log('nochange')
    }
  }
}
