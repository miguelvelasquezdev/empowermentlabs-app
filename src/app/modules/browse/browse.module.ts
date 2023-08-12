import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { TrendingTvShowsComponent } from './components/trending-tv-shows/trending-tv-shows.component';

@NgModule({
  declarations: [BrowseComponent, TrendingMoviesComponent, TrendingTvShowsComponent],
  imports: [CommonModule, BrowseRoutingModule, MatGridListModule],
})
export class BrowseModule {}
