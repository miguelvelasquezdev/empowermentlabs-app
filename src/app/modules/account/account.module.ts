import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AccountComponent, FavoritesComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
