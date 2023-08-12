import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticationUrl =
    'https://api.themoviedb.org/3/authentication';
  private readonly authenticateUrl = 'https://www.themoviedb.org/authenticate';

  constructor(private http: HttpClient) {}

  createRequestToken() {
    return this.http.get<any>(`${this.authenticationUrl}/token/new`);
  }

  createSession(request_token: string) {
    return this.http.post<any>(`${this.authenticationUrl}/session/new`, {
      request_token,
    });
  }
}
