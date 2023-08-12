import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private readonly trendingUrl = 'https://api.themoviedb.org/3/trending';

  constructor(private readonly http: HttpClient) {}

  getMovies() {
    return this.http.get<any>(`${this.trendingUrl}/movie/day?language=en-US`);
  }

  getTVShows() {
    return this.http.get<any>(`${this.trendingUrl}/tv/day?language=en-US`);
  }
}
