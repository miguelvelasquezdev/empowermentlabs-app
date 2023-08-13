import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  guestSessionId: string | null = '';

  constructor(
    private readonly authService: AuthService,
    private activateRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activateRoute.paramMap.subscribe(obs => {
      console.log(obs.get('request_token'), 'query');
    });
    this.guestSessionId = localStorage.getItem('guest_session_id');
  }

  signInAsGuest() {
    this.authService.createGuestSession().subscribe(async data => {
      console.log(data, 'data???????');
      if (!localStorage.getItem('guest_session_id')) {
        localStorage.setItem('guest_session_id', data.session_id);
        this.guestSessionId = data.guest_session_id;
      }
    });
  }
}
