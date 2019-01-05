import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANT } from '../../common/constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent, MatSnackBar } from '@angular/material';
import {PendingService} from '../../services/pending.service';
import { Utils } from '../../common/core-utils';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  newPassForm: FormGroup;
  userData: any
  constructor(
    private router: Router,
    private snackDialog: MatSnackBar,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.userData = Utils.getFullCurrentUser();
    this.userForm = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      phone: new FormControl(this.userData.phone, [Validators.required]),
      email: new FormControl(this.userData.email),
      address: new FormControl(this.userData.address, [Validators.required])
    });
    this.newPassForm = new FormGroup({
      new: new FormControl('', [Validators.required]),
      old: new FormControl('', [Validators.required]),
    })
  }
  keyDown(field) {
    if (this.userForm.valid) {
      let newInfo = {
        ...this.userData,
      }
      newInfo[field] = this.userForm.controls[field].value;
      this.authService.editProfile(newInfo).pipe(
        catchError(err => {
          this.snackDialog.open('Cập nhật thất bại', '', {duration: 1000})
          return throwError(err);
        })
      )
      .subscribe(res => {
        localStorage.setItem('userData', JSON.stringify(res));
        Utils.currentFullUser = res;
        this.snackDialog.open('Cập nhật thành công', '', {duration: 1000})
      }
      )
    }
  }
  changePassword() {
    if (this.newPassForm.valid) {
      this.authService.changePassword(this.userData.id, this.newPassForm.controls['old'].value, this.newPassForm.controls['new'].value)
      .pipe(
        catchError(err => {
          this.snackDialog.open('Mật khẩu cũ không chính xác', '', {duration: 1000})
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.snackDialog.open('Cập nhật thành công', '', {duration: 1000})
        if(res){
            this.newPassForm.controls['old'].setValue('');
            this.newPassForm.controls['new'].setValue('');
            this.newPassForm.markAsDirty();
          }
        })
    }
  }
  updateProfile() {
    const newInfo = {
      id: this.userData.id,
      username: this.userData.username,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      address: this.userForm.controls['address'].value,
      name: this.userForm.controls['name'].value,
    }
    this.authService.editProfile(newInfo).pipe(
      catchError(err => {
        this.snackDialog.open('Cập nhật thất bại', '', {duration: 1000})
        return throwError(err);
      })
    )
    .subscribe(res => {
      this.snackDialog.open('Cập nhật thành công', '', {duration: 1000})
    }
    )
  }
}
