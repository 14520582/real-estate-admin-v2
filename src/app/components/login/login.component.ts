import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animations } from '../../ui-core/animations/aminations';
import { ConfigService} from '../../ui-core/services/ui.config.service';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : Animations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    error: string;
    constructor(
      private config: ConfigService,
      private router: Router,
      private authService: AuthService,
      private formBuilder: FormBuilder
    ) {
      this.config.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }
    login() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).pipe(
                catchError ( err => {
                        this.error = 'Tài khoản và mật khẩu không chính xác!'
                        return throwError(err)
                    }
                )
            )
            .subscribe( res => {
                localStorage.setItem('userData', JSON.stringify(res));
                this.authService.logged.next(true);
                console.log(res)
                this.router.navigate(['/manager-property']);
            })
        }
    }
    onLoginFormValuesChanged() {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
