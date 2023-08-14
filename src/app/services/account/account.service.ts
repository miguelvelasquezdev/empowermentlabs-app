import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { FavoriteResponse } from 'src/app/types/account';
import { Movies, TVShows } from 'src/app/types/shared';
import { AuthService } from '../auth/auth.service';

export type Favorite = {
  media_type: string;
  media_id: number;
  favorite: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly accountUrl = 'https://api.themoviedb.org/3/account';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  addFavorite(favorite: Favorite) {
    if (!this.authService.sessionId$.value) {
      return throwError(() => new Error('User is not signed out'));
    }
    return this.http.post<FavoriteResponse>(
      `${this.accountUrl}/${this.authService.sessionId$.value}/favorite`,
      {
        media_type: favorite.media_type,
        media_id: favorite.media_id,
        favorite: favorite.favorite,
      }
    );
  }

  getFavoriteMovies() {
    if (!this.authService.sessionId$.value) {
      return throwError(() => new Error('User is not signed out'));
    }
    return this.http.get<Movies>(
      `${this.accountUrl}/${this.authService.sessionId$.value}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
    );
  }

  getFavoriteTVShows() {
    if (!this.authService.sessionId$.value) {
      return throwError(() => new Error('User is not signed out'));
    }
    return this.http.get<TVShows>(
      `${this.accountUrl}/${this.authService.sessionId$.value}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`
    );
  }
}
