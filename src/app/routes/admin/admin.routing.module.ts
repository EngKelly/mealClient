import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { adminRoute } from './admin.routing';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(adminRoute)],
  providers: [],
  exports: [RouterModule],
})
export class AdminRoutesModule {}
