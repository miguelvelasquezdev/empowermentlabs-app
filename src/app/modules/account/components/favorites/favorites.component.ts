import { Component, OnInit } from '@angular/core';
import { forkJoin, mergeMap, throwError } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { MovieResult } from 'src/app/types/shared';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: MovieResult[] = [];

  constructor(
    private accountService: AccountService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    const sessionId = await this.validateUser();
    forkJoin([
      await this.accountService.getFavoriteMovies(sessionId),
      await this.accountService.getFavoriteTVShows(sessionId),
    ]).subscribe(([movies, tvShows]) => {
      this.favorites = [];
      this.favorites = movies.results.concat(
        tvShows.results as unknown as MovieResult[]
      );
    });
  }

  async favoriteMedia(mediaItem: MovieResult) {
    const sessionId = await this.validateUser();
    const favorite = {
      media_id: mediaItem.id,
      media_type: mediaItem.media_type,
      favorite: !mediaItem.favorite,
    };
    (await this.accountService.addFavorite(favorite, sessionId)).subscribe({
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

  private async validateUser() {
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
    return sessionId;
  }
}
