import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {
  AccountService,
  type Favorite,
} from 'src/app/services/account/account.service';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css'],
})
export class TrendingMoviesComponent implements OnInit {
  trendingMovies: any[] = [];
  imagesUrl = environment.imagesUrl;

  constructor(
    private readonly trendingService: TrendingService,
    private readonly accountService: AccountService
  ) {}

  ngOnInit() {
    this.trendingService
      .getMovies()
      .pipe(
        map(data => {
          data.results.forEach((trendingMovie: any) => {
            trendingMovie.poster_path = `${this.imagesUrl}/${trendingMovie.poster_path}`;
          });
          console.log(data);
          return data;
        })
      )
      .subscribe(data => {
        this.trendingMovies = data.results;
      });
  }

  favoriteMovie(movie: any) {
    console.log(movie, 'movie');
    const favorite = {
      media_id: movie.id,
      media_type: movie.media_type,
      favorite: true, // todo
    };
    this.accountService.addFavorite(favorite).subscribe(data => {});
  }
}
