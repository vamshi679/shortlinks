import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../services/route.guard';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent ,canActivate:[RouteGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
