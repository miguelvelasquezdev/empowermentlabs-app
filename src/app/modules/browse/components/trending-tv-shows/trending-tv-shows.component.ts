import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

import { TrendingService } from 'src/app/services/trending/trending.service';
import { TVShowResult } from 'src/app/types/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending-tv-shows',
  templateUrl: './trending-tv-shows.component.html',
  styleUrls: ['./trending-tv-shows.component.css'],
})
export class TrendingTvShowsComponent implements OnInit {
  trendingTVShows: TVShowResult[] = [];
  imagesUrl = environment.imagesUrl;

  constructor(
    public supabase: SupabaseService,
    private accountService: AccountService,
    private trendingService: TrendingService
  ) {}

  ngOnInit() {
    this.trendingService
      .getTVShows()
      .pipe(
        mergeMap(async data => {
          const favoriteTVShows$ =
            await this.accountService.getFavoriteTVShows();
          return favoriteTVShows$.pipe(
            catchError(err => {
              return of({ results: [] });
            }),
            map(favorites => {
              favorites.results.forEach(favorite => {
                const movie = data.results.find(
                  movie => movie.id === favorite.id
                );
                if (movie) {
                  movie.favorite = true;
                }
              });
              return data;
            })
          );
        })
      )
      .subscribe(data =>
        data
          .pipe(
            map(data => {
              data.results.forEach(trendingTVShow => {
                trendingTVShow.poster_path = `${this.imagesUrl}/${trendingTVShow.poster_path}`;
                trendingTVShow.title = trendingTVShow.name;
              });
              return data;
            })
          )
          .subscribe(tvShows => {
            this.trendingTVShows = tvShows.results;
          })
      );
  }

  async favoriteTVShow(TVShow: TVShowResult) {
    const favorite = {
      media_id: TVShow.id,
      media_type: TVShow.media_type,
      favorite: !TVShow.favorite,
    };
    (await this.accountService.addFavorite(favorite)).subscribe(data => {
      TVShow.favorite = !TVShow.favorite;
    });
  }
}
