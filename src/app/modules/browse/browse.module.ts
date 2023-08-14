import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { TrendingTvShowsComponent } from './components/trending-tv-shows/trending-tv-shows.component';
import { MatIconModule } from '@angular/material/icon';
import { ResultsComponent } from './components/results/results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BrowseComponent,
    TrendingMoviesComponent,
    TrendingTvShowsComponent,
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
    SharedModule,
  ],
})
export class BrowseModule {}
