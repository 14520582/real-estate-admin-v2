import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animations } from '../../ui-core/animations/aminations';
import { ConfigService} from '../../ui-core/services/ui.config.service';
import {Router} from '@angular/router';


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

    constructor(
      private config: ConfigService,
      private router: Router,
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
        localStorage.setItem('userData', 'aaa');
        console.log('aa')
        this.router.navigate(['/manager-property']);
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
