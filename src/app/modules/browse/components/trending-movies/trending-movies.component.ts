import { Component, OnInit } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    public authService: AuthService,
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
        mergeMap(data =>
          this.accountService.getFavoriteMovies().pipe(
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
      .subscribe(data => (this.trendingMovies = data.results));
  }

  favoriteMovie(movie: MovieResult) {
    const favorite = {
      media_id: movie.id,
      media_type: movie.media_type,
      favorite: !movie.favorite,
    };
    this.accountService.addFavorite(favorite).subscribe({
      next: () => {
        console.log('eh?');
        movie.favorite = !movie.favorite;
      },
      error: err => {
        console.log('here?');
        if (err instanceof Error) {
          throw Error(err.message);
        }
      },
    });
  }
}
