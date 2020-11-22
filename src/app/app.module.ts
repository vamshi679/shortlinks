import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustonValidatorService } from "./services/custon-validator.service";
import { DataService } from "./services/data.service";
import { MainComponent } from './main/main.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HttpClientModule } from "@angular/common/http"; 
import { RouteGuard } from "./services/route.guard";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { PwdresetComponent } from './pwdreset/pwdreset.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    AuthenticateComponent,
    PwdresetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule
  ],
  providers: [CustonValidatorService,DataService,RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
