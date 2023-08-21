import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JwtTokenInterceptor } from './extension/http.interceptor';
import { PagesModule } from './pages/pages.module';
import { AppRoutesModule } from './routes/app/app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePageTitleStrategy } from './extension/title.strategy';
import { TitleStrategy } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    PagesModule,
    BrowserAnimationsModule,
    AppRoutesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
