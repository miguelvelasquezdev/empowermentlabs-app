import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';
import { SearchService } from 'src/app/services/search/search.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { MovieResult, Movies } from 'src/app/types/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnChanges {
  @Input() text = '';
  imagesUrl = environment.imagesUrl;
  mediaItems: MovieResult[] = [];

  constructor(
    public supabase: SupabaseService,
    private readonly searchService: SearchService,
    private readonly accountService: AccountService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.searchMovies(changes['text'].currentValue);
  }

  private searchMovies(text: string) {
    forkJoin([this.getMovies(text), this.getTVShows(text)]).subscribe(
      ([movies$, tvShows$]) => {
        forkJoin([movies$, tvShows$]).subscribe(([movies, tvShows]) => {
          this.mediaItems = [];
          this.mediaItems = movies.results.concat(tvShows.results);
        });
      }
    );
  }

  private getMovies(text: string) {
    return this.searchService.searchMovies(text).pipe(
      map(data => {
        data.results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_path = `${this.imagesUrl}/${movie.poster_path}`;
          }
          movie.media_type = 'movie';
        });
        return data;
      }),
      mergeMap(async data =>
        (await this.accountService.getFavoriteMovies()).pipe(
          catchError(() => of({ results: [] as MovieResult[] } as Movies)),
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
    );
  }

  private getTVShows(text: string) {
    return this.searchService.searchTVShows(text).pipe(
      map(data => {
        data.results.forEach(tvShow => {
          if (tvShow.poster_path) {
            tvShow.poster_path = `${this.imagesUrl}/${tvShow.poster_path}`;
          }
          tvShow.media_type = 'tv';
          tvShow.title = tvShow.name;
        });
        return data as unknown as Movies;
      }),
      mergeMap(async data =>
        (await this.accountService.getFavoriteTVShows()).pipe(
          catchError(() => of({ results: [] as MovieResult[] } as Movies)),
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
    );
  }

  async favoriteMedia(mediaItem: MovieResult) {
    const favorite = {
      media_id: mediaItem.id,
      media_type: mediaItem.media_type,
      favorite: !mediaItem.favorite,
    };
    (await this.accountService.addFavorite(favorite)).subscribe({
      next: () => {
        mediaItem.favorite = !mediaItem.favorite;
      },
      error: err => {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      },
    });
  }
}
