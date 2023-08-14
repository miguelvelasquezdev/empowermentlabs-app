import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, TVShows } from 'src/app/types/shared';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private readonly trendingUrl = 'https://api.themoviedb.org/3/trending';

  constructor(private readonly http: HttpClient) {}

  getMovies() {
    return this.http.get<Movies>(
      `${this.trendingUrl}/movie/day?language=en-US`
    );
  }

  getTVShows() {
    return this.http.get<TVShows>(`${this.trendingUrl}/tv/day?language=en-US`);
  }
}
