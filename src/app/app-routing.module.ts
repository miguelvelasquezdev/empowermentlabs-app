import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  {
    path: 'browse',
    loadChildren: () =>
      import('./modules/browse/browse.module').then(m => m.BrowseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
