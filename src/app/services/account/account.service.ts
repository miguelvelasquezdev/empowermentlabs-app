import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(private readonly http: HttpClient) {}

  addFavorite(favorite: Favorite) {
    const guestSessionId = localStorage.getItem('guest_session_id');
    if (!guestSessionId) {
      throw Error('User is not signed out');
    }
    return this.http.post<any>(
      `${this.accountUrl}/${guestSessionId}/favorite`,
      {
        media_type: favorite.media_type,
        media_id: favorite.media_id,
        favorite: favorite.favorite,
      }
    );
  }

  getFavoriteMovies() {}
}
