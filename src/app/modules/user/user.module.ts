import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.comoponent';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { UserService } from './user.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SettingsComponent,
    SignupComponent,
    SigninComponent
  ],
  exports: [
    SettingsComponent,
    SignupComponent,
    SigninComponent
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
