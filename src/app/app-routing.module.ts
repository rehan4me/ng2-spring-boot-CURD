import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpListComponent } from './employees/emp-list/emp-list.component';
import { EmpDetailsComponent } from './employees/emp-details/emp-details.component';

export const routes: Routes = [
	{
        path: '',
        redirectTo: 'emp-list',
        pathMatch: 'full',
    },
    {
        path: 'emp-list',
        component: EmpListComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: 'new-emp',
        component: EmpDetailsComponent,
        data: {
            title: 'New Employee'
        }
    },
    {
        path: 'emp-details/:id',
        component: EmpDetailsComponent,
        data: {
            title: 'Employee Details'
        }
    },
    { path: '**', redirectTo: 'emp-list' }
];

@NgModule({
  //imports: [ RouterModule.forRoot(routes, { useHash: true })],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
