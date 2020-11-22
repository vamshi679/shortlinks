import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PwdresetComponent, ResetPassword } from './pwdreset/pwdreset.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './services/route.guard';


const routes: Routes = [
  {path:"",redirectTo:'/main',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'main',component:MainComponent},
  {path:'authenticate/:id',component:AuthenticateComponent},
  {path:'resetpassword/:email',component:PwdresetComponent}, // path to which user is redirected when clicked on link (link send to user)
  {path:'forgotpassword',component:ResetPassword}, // path where user click from login page / dashboard  
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
