import { RouterModule, TitleStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from './app.routing';
import { TemplatePageTitleStrategy } from '../../extension/title.strategy';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
  exports: [RouterModule],
})
export class AppRoutesModule {}
