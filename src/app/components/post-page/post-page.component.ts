import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DATA } from '../../common/data'
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  realEstateForm: FormGroup;
  cities: string[] = DATA.cities;
  districts: string[] = DATA.districts;
  wards: string[] = DATA.wards;
  directions: string[] = DATA.directions;
  floors: string[] = DATA.floors;
  checked: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.realEstateForm = this.formBuilder.group({
      form: [0, Validators.required],
      type: [0, Validators.required],
      city: [1, Validators.required],
      district: ['Quận 1', Validators.required],
      ward: ['Phường 2', Validators.required],
      no: ['', Validators.required],
      street: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      license: [0, Validators.required],
      price: [0, Validators.required],
      area: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      floor: ['', Validators.required],
      direction: ['all', Validators.required],
      numberOfBedRoom: ['', Validators.required],
      numberOfBathRoom: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
}
