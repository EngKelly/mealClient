import { navigationGuard } from './../../guard/navigation/navigation.guard';
import { authGuard } from './../../guard/auth/auth.guard';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { ProductComponent } from '../../pages/product/product.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../pages/index/index.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { LoginComponent } from '../../components/login/login.component';
import { UserComponent } from '../../pages/user/user.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { BlogComponent } from '../../pages/blog/blog.component';
import { BlogDetailComponent } from '../../components/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: IndexComponent, title: 'Home' },
  { path: 'home', component: IndexComponent, title: 'Home' },
  { path: 'user/:userId', component: UserComponent },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'product/:productId', component: ProductComponent },
  {
    path: 'carts',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'Carts',
  },
  { path: 'cart/:id', component: CartComponent },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [navigationGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'SignUp',
    canActivate: [navigationGuard],
  },
  {
    path: 'admin',
    title: 'Admin',
    loadChildren: () =>
      import('../../admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'blog', component: BlogComponent, title: 'Blogs' },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '**', component: PageNotFoundComponent, title: 'PageNotFound' },
];
