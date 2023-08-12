import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private readonly trendingUrl = 'https://api.themoviedb.org/3/trending';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<{}>(`${this.trendingUrl}/movie/day?language=en-US`);
  }

  getTVSeries() {
    return this.http.get<{}>(`${this.trendingUrl}/tv/day?language=en-US`);
  }
}
