import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending-tv-shows',
  templateUrl: './trending-tv-shows.component.html',
  styleUrls: ['./trending-tv-shows.component.css'],
})
export class TrendingTvShowsComponent implements OnInit {
  trendingTVShows: any[] = [];
  imagesUrl = environment.imagesUrl;

  constructor(
    private trendingService: TrendingService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.trendingService
      .getTVShows()
      .pipe(
        map((data: any) => {
          data.results.forEach((trendingTVShow: any) => {
            trendingTVShow.poster_path = `${this.imagesUrl}/${trendingTVShow.poster_path}`;
          });
          return data;
        }),
        mergeMap((data: any) =>
          this.accountService.getFavoriteTVShows().pipe(
            map((favorites: any) => {
              favorites.results.forEach((favorite: any) => {
                const movie = data.results.find(
                  (movie: any) => movie.id === favorite.id
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
      .subscribe((data: any) => {
        this.trendingTVShows = data.results;
      });
  }

  favoriteMovie(movie: any) {
    movie.favorite = !movie.favorite;
    const favorite = {
      media_id: movie.id,
      media_type: movie.media_type,
      favorite: movie.favorite, // todo
    };
    this.accountService.addFavorite(favorite).subscribe(data => {});
  }
}
