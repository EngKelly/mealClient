import { AddProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { AdminMaterialModule } from './design/admin.material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminRoutesModule } from '../routes/admin/admin.routing.module';

@NgModule({
  declarations: [
    AddProductComponent,
    UsersComponent,
    DashboardComponent,
    AdminComponent,
  ],
  imports: [AdminMaterialModule, AdminRoutesModule],
  exports: [],
})
export class AdminModule {}
