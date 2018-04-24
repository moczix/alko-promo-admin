import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import {AuthGuardService} from '../../shared/auth-guard.service';
import {AlcoholListComponent} from './alcohol-list/alcohol-list.component';
import {AlcoholComponent} from './alcohol/alcohol.component';



const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'alcohols',
        component: AlcoholListComponent
      },
      {
        path: 'alcohols/:id',
        component: AlcoholComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
