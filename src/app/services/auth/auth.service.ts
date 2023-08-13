import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticationUrl =
    'https://api.themoviedb.org/3/authentication';
  private readonly authenticateUrl = 'https://www.themoviedb.org/authenticate';

  constructor(private readonly http: HttpClient) {}

  createGuestSession() {
    return this.http.get<any>(`${this.authenticationUrl}/guest_session/new`);
  }
}
