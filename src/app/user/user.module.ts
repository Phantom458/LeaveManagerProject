import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],

  exports: [UserComponent]
})
export class UserModule { }
