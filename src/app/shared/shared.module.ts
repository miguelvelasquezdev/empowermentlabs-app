import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GridComponent } from './components/grid/grid.component';
import { BrowseRoutingModule } from '../modules/browse/browse-routing.module';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, GridComponent],
  imports: [CommonModule, BrowseRoutingModule, MatToolbarModule, MatIconModule],
  exports: [HeaderComponent, GridComponent, NotFoundComponent],
})
export class SharedModule {}
