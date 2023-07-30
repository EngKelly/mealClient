import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgMaterialModule } from '../design/ng-material.module';
import { RoutesModule } from '../routes/routes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    LoginComponent,
    SignUpComponent,
    FooterComponent,
    BlogDetailComponent,
  ],
  imports: [CommonModule, NgMaterialModule, RoutesModule, FormsModule],
  exports: [SearchBarComponent, FooterComponent, NavbarComponent],
})
export class ComponentModule {}
