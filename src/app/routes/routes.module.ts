import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from './route.routing';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutesModule {}
