import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchUrl = 'https://api.themoviedb.org/3/search';

  constructor(private readonly http: HttpClient) {}

  searchMovies(query: string) {
    return this.http.get<any>(
      `${this.searchUrl}/movie?query=${query}&language=en-US&page=1`
    );
  }
}
