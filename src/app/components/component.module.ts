import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    LoginComponent,
    SignUpComponent,
    FooterComponent,
    BlogDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [FormsModule, CommonModule, RouterModule],
  exports: [
    SearchBarComponent,
    FooterComponent,
    NavbarComponent,
    CommonModule,
    RouterModule,
  ],
})
export class ComponentModule {}
