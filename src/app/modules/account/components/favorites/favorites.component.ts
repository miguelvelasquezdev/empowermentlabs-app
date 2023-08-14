import { Component, OnInit } from '@angular/core';
import { forkJoin, mergeMap } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';
import { MovieResult } from 'src/app/types/shared';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: MovieResult[] = [];

  constructor(private accountService: AccountService) {}

  async ngOnInit() {
    forkJoin([
      await this.accountService.getFavoriteMovies(),
      await this.accountService.getFavoriteTVShows(),
    ]).subscribe(([movies, tvShows]) => {
      this.favorites = [];
      this.favorites = movies.results.concat(
        tvShows.results as unknown as MovieResult[]
      );
    });
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
