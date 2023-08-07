import { roleGuard } from './../../guard/role/role.guard';
import { AddProductComponent } from '../../admin/product/product.component';
import { UsersComponent } from '../../admin/users/users.component';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';

export const adminRoute: Routes = [
  { path: '', component: AdminComponent, title: 'Admin' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  { path: 'users', component: UsersComponent, title: 'Users' },
  {
    path: 'add-product',
    canActivate: [roleGuard],
    component: AddProductComponent,
    title: 'Products',
  },
];
