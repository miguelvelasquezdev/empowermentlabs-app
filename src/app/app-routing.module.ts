import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  {
    path: 'browse',
    loadChildren: () =>
      import('./modules/browse/browse.module').then(m => m.BrowseModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./modules/detail/detail.module').then(m => m.DetailModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
