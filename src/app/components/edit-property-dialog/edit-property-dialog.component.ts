import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DATA } from '../../common/data'
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-property-dialog',
  templateUrl: './edit-property-dialog.html',
  styleUrls: ['./edit-property-dialog.scss']
})
export class EditPropertyComponent implements OnInit {
  realEstateForm: FormGroup;
  cities: string[] = DATA.cities;
  districts = [];
  wards = [];
  directions: string[] = DATA.directions;
  floors: string[] = DATA.floors;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private propertyService: PropertyService
  ) {
    this.realEstateForm = this.formBuilder.group({
      form: [0, Validators.required],
      type: [0, Validators.required],
      city: [1, Validators.required],
      district: [null, Validators.required],
      ward: [null, Validators.required],
      no: ['', Validators.required],
      street: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      license: [0, Validators.required],
      price: [0, Validators.required],
      area: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      floor: ['', Validators.required],
      title: ['', Validators.required],
      direction: ['', Validators.required],
      numberOfBedRoom: ['', Validators.required],
      numberOfBathRoom: ['', Validators.required]
    });
    this.propertyService.getDistrictByCity(1).subscribe(dis => {
      this.districts = dis;
    })
    this.realEstateForm.controls['district'].valueChanges.subscribe(data => {
      this.propertyService.getWardByDistrict(data).subscribe( w => {
        this.wards = w;
        this.realEstateForm.controls['ward'].setValue(null)
      })
    })
    
  }
  submit() {
  }
  ngOnInit() {
  }
}
