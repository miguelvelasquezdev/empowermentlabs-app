import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get<{}>(
      `${this.moviesUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
  }
}
