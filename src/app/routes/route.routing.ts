import { AdminProductComponent } from './../pages/admin/product/product.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductsComponent } from '../pages/products/products.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../pages/index/index.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { UserComponent } from '../pages/user/user.component';
import { CartComponent } from '../pages/cart/cart.component';
import { BlogComponent } from '../pages/blog/blog.component';
import { BlogDetailComponent } from '../components/blog-detail/blog-detail.component';
import { UsersComponent } from '../pages/admin/users/users.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: IndexComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'carts', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin/product', component: AdminProductComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
];
