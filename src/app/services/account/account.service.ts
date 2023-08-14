import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { FavoriteResponse } from 'src/app/types/account';
import { Movies, TVShows } from 'src/app/types/shared';
import { AuthService } from '../auth/auth.service';
import { SupabaseService } from '../supabase/supabase.service';

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
    private supabase: SupabaseService,
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  async addFavorite(favorite: Favorite) {
    if (!this.supabase.session?.user) {
      return throwError(() => new Error('User is not signed out'));
    }
    const sessionId = (await this.supabase.profile(this.supabase.session.user))
      .data?.session_id;

    if (!sessionId) {
      return throwError(
        () => new Error('Something wrong has happened trying to log in')
      );
    }
    return this.http.post<FavoriteResponse>(
      `${this.accountUrl}/${sessionId}/favorite`,
      {
        media_type: favorite.media_type,
        media_id: favorite.media_id,
        favorite: favorite.favorite,
      }
    );
  }

  async getFavoriteMovies() {
    if (!this.supabase.session?.user) {
      return throwError(() => new Error('User is not signed out'));
    }
    const sessionId = (await this.supabase.profile(this.supabase.session.user))
      .data?.session_id;

    if (!sessionId) {
      return throwError(
        () => new Error('Something wrong has happened trying to log in')
      );
    }
    return this.http.get<Movies>(
      `${this.accountUrl}/${sessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
    );
  }

  async getFavoriteTVShows() {
    if (!this.supabase.session?.user) {
      return throwError(() => new Error('User is not signed out'));
    }
    const sessionId = (await this.supabase.profile(this.supabase.session.user))
      .data?.session_id;

    if (!sessionId) {
      return throwError(
        () => new Error('Something wrong has happened trying to log in')
      );
    }

    return this.http.get<TVShows>(
      `${this.accountUrl}/${sessionId}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`
    );
  }
}
