import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DATA } from '../../common/data'
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  realEstateForm: FormGroup;
  cities: string[] = DATA.cities;
  districts = [];
  wards = [];
  directions: string[] = DATA.directions;
  floors: string[] = DATA.floors;
  checked: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
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
    if(this.realEstateForm.valid) {
      const body = {
        title: this.realEstateForm.controls['title'].value,
        price: this.realEstateForm.controls['price'].value,
        form: this.realEstateForm.controls['form'].value,
        license: this.realEstateForm.controls['license'].value,
        address: {
          city: {
            id: 1
          },
          district: {
            id: this.realEstateForm.controls['district'].value
          },
          ward: {
            id: this.realEstateForm.controls['ward'].value
          },
          no: this.realEstateForm.controls['no'].value,
          street: this.realEstateForm.controls['street'].value
        },
        cover: this.realEstateForm.controls['cover'].value,
        numofbedroom: this.realEstateForm.controls['numberOfBedRoom'].value,
        numofbathroom: this.realEstateForm.controls['numberOfBathRoom'].value,
        phone: this.realEstateForm.controls['phone'].value,
        nameOfOwner: this.realEstateForm.controls['name'].value,
        email: this.realEstateForm.controls['email'].value,
        numoffloor: this.realEstateForm.controls['floor'].value,
        direction: this.realEstateForm.controls['direction'].value,
        type: this.realEstateForm.controls['type'].value,
        height: this.realEstateForm.controls['height'].value,
        width: this.realEstateForm.controls['width'].value,
        area: this.realEstateForm.controls['area'].value,
        description: this.realEstateForm.controls['description'].value,
      }
      console.log(body);
      this.propertyService.createProperty(body).subscribe( res => {
        this.snackBar.open('Đăng thành công', '', {
          duration: 2000,
        });
        this.router.navigate(['/manager-property/'])
      })
    }
  }
  ngOnInit() {
  }
}
