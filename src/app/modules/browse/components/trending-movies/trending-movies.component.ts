import { Component, OnInit } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { MovieResult } from 'src/app/types/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css'],
})
export class TrendingMoviesComponent implements OnInit {
  trendingMovies: MovieResult[] = [];
  imagesUrl = environment.imagesUrl;

  constructor(
    public supabase: SupabaseService,
    private readonly trendingService: TrendingService,
    private readonly accountService: AccountService
  ) {}

  ngOnInit() {
    this.trendingService
      .getMovies()
      .pipe(
        map(data => {
          data.results.forEach(trendingMovie => {
            trendingMovie.poster_path = `${this.imagesUrl}/${trendingMovie.poster_path}`;
            trendingMovie.favorite = false;
          });
          return data;
        }),
        mergeMap(async data =>
          (await this.accountService.getFavoriteMovies()).pipe(
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
        data.subscribe(movies => {
          this.trendingMovies = movies.results;
        });
      });
  }

  async favoriteMovie(movie: MovieResult) {
    const favorite = {
      media_id: movie.id,
      media_type: movie.media_type,
      favorite: !movie.favorite,
    };
    (await this.accountService.addFavorite(favorite)).subscribe({
      next: () => {
        movie.favorite = !movie.favorite;
      },
      error: err => {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      },
    });
  }
}
