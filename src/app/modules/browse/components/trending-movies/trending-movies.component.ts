import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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

  constructor(private readonly trendingService: TrendingService) {}

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
}
