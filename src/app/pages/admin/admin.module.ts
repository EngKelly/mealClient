import { AdminProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AdminProductComponent, UsersComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
})
export class AdminModule {}
