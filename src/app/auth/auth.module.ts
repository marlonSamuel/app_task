import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@app/material.module';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '@app/shared/loading/loading-spinner.module';

/**
 * NgModule for the authentication features.
 * 
 * This module is responsible for handling authentication-related components and functionality.
*/
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIcon,
    ReactiveFormsModule,
    LoadingSpinnerModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
