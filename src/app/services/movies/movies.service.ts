import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MovieResult } from 'src/app/types/shared';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl = 'https://api.themoviedb.org/3/movie';

  constructor(private http: HttpClient) {}

  getMovie(id: string) {
    return this.http.get<MovieResult>(`${this.moviesUrl}/${id}?language=en-US`);
  }
}
