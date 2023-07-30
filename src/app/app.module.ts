import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IndexComponent } from './pages/index/index.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RoutesModule } from './routes/routes.module';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { JwtTokenInterceptor } from './extension/http.interceptor';
import { ProductsComponent } from './pages/products/products.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { TruncatePipe } from './pipes/truncate-string';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    IndexComponent,
    CartComponent,
    ProductComponent,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    UserComponent,
    UsersComponent,
    ProductsComponent,
    BlogComponent,
    BlogDetailComponent,
    TruncatePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RoutesModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
