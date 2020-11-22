import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule} from "@angular/forms";

import { UserComponent } from './user.component';
import { UserService } from "./user.service";
import { ClipboardModule } from "@angular/cdk/clipboard";


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers:[UserService] 
})
export class UserModule { }
 