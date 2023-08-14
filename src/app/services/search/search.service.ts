import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, TVShows } from 'src/app/types/shared';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchUrl = 'https://api.themoviedb.org/3/search';

  constructor(private readonly http: HttpClient) {}

  searchMovies(query: string) {
    return this.http.get<Movies>(
      `${this.searchUrl}/movie?query=${query}&language=en-US&page=1`
    );
  }

  searchTVShows(query: string) {
    return this.http.get<TVShows>(
      `${this.searchUrl}/tv?query=${query}&language=en-US&page=1`
    );
  }
}
