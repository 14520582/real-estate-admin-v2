import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DATA } from '../../common/data'
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-edit-property-dialog',
  templateUrl: './edit-property-dialog.component.html',
  styleUrls: ['./edit-property-dialog.component.scss']
})
export class EditPropertyComponent implements OnInit {
  realEstateForm: FormGroup;
  cities: string[] = DATA.cities;
  districts = [];
  wards = [];
  directions: string[] = DATA.directions;
  floors: string[] = DATA.floors;
  uploadProgress: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPropertyComponent>,
    private afStorage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private propertyService: PropertyService
  ) {
    this.propertyService.getDistrictByCity(1).subscribe(dis => {
      this.districts = dis;
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
      this.dialogRef.close(body);
    }
  }
  upload(event) {
    const randomId = 'upload/realestate/' + Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    let task: any = ref.put(event.target.files[0]);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      // finalize((a) => {console.log(a)})
    )
    .subscribe( snapshot => {
      // get image upload progress
    },
    error => alert('Some error occured while uploading the picture'),
    () => ref.getDownloadURL().subscribe(downloadUrl => {
      // finally get download url from ref on completion of observable
      this.realEstateForm.controls['cover'].setValue(downloadUrl);
    }))
  }
  ngOnInit() {
    this.realEstateForm = this.formBuilder.group({
      form: [this.data.item.form, Validators.required],
      type: [this.data.item.type, Validators.required],
      city: [this.data.item.address.city.id, Validators.required],
      district: [this.data.item.address.district.id, Validators.required],
      ward: [this.data.item.address.ward.id, Validators.required],
      no: [this.data.item.address.no, Validators.required],
      street: [this.data.item.address.street, Validators.required],
      cover: [this.data.item.cover, Validators.required],
      description: [this.data.item.description, Validators.required],
      name: [this.data.item.nameOfOwner, Validators.required],
      phone: [this.data.item.phone, Validators.required],
      email: [this.data.item.email, Validators.required],
      license: [this.data.item.license, Validators.required],
      price: [this.data.item.price, Validators.required],
      area: [this.data.item.area, Validators.required],
      height: [this.data.item.height, Validators.required],
      width: [this.data.item.width, Validators.required],
      floor: [this.data.item.numoffloor, Validators.required],
      title: [this.data.item.title, Validators.required],
      direction: [this.data.item.direction, Validators.required],
      numberOfBedRoom: [this.data.item.numofbedroom, Validators.required],
      numberOfBathRoom: [this.data.item.numofbathroom, Validators.required]
    });
    this.propertyService.getWardByDistrict(this.realEstateForm.controls['district'].value).subscribe( w => {
      this.wards = w;
    })
    this.realEstateForm.controls['district'].valueChanges.subscribe(data => {
      this.propertyService.getWardByDistrict(data).subscribe( w => {
        this.wards = w;
        this.realEstateForm.controls['ward'].setValue(null)
      })
    })
  }
  close() {
    this.dialogRef.close();
  }
}
