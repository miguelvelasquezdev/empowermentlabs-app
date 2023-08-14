import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestSessionResponse } from 'src/app/types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticationUrl =
    'https://api.themoviedb.org/3/authentication';

  constructor(private readonly http: HttpClient) {}

  createGuestSession() {
    return this.http.get<GuestSessionResponse>(
      `${this.authenticationUrl}/guest_session/new`
    );
  }
}
