import { AdminProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AdminMaterialModule } from './design/admin.material.module';

@NgModule({
  declarations: [AdminProductComponent, UsersComponent],
  imports: [CommonModule, AdminMaterialModule],
})
export class AdminModule {}
