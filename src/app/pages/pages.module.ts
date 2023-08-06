import { NgModule } from '@angular/core';
import { ComponentModule } from '../components/component.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';
import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipes/truncate-string';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    UserComponent,
    IndexComponent,
    CartComponent,
    BlogComponent,
    TruncatePipe,
  ],
  imports: [ComponentModule, FormsModule],
  exports: [ComponentModule],
})
export class PagesModule {}
