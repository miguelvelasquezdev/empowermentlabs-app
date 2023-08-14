import { Component, OnInit } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';
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
    private trendingService: TrendingService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.trendingService
      .getTVShows()
      .pipe(
        map(data => {
          data.results.forEach(trendingTVShow => {
            trendingTVShow.poster_path = `${this.imagesUrl}/${trendingTVShow.poster_path}`;
          });
          return data;
        }),
        mergeMap(data =>
          this.accountService.getFavoriteTVShows().pipe(
            catchError(() => {
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
          )
        )
      )
      .subscribe(data => {
        this.trendingTVShows = data.results;
      });
  }

  favoriteTVShow(TVShow: TVShowResult) {
    TVShow.favorite = !TVShow.favorite;
    const favorite = {
      media_id: TVShow.id,
      media_type: TVShow.media_type,
      favorite: TVShow.favorite, // todo
    };
    this.accountService.addFavorite(favorite).subscribe(data => {});
  }
}
