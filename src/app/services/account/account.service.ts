import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  async addFavorite(favorite: Favorite, sessionId: string) {
    return this.http.post<FavoriteResponse>(
      `${this.accountUrl}/${sessionId}/favorite`,
      {
        media_type: favorite.media_type,
        media_id: favorite.media_id,
        favorite: favorite.favorite,
      }
    );
  }

  async getFavoriteMovies(sessionId: string) {
    return this.http.get<Movies>(
      `${this.accountUrl}/${sessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
    );
  }

  async getFavoriteTVShows(sessionId: string) {
    return this.http.get<TVShows>(
      `${this.accountUrl}/${sessionId}/favorite/tv?language=en-US&page=1&sort_by=created_at.asc`
    );
  }
}
