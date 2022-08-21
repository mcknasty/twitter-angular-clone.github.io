import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './routes';

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
