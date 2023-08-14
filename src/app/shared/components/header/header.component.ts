import { Component } from '@angular/core';
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
  ) {
    this.guestSessionId = localStorage.getItem('guest_session_id');
  }

  signInAsGuest() {
    this.authService.createGuestSession().subscribe(async data => {
      if (!localStorage.getItem('guest_session_id')) {
        localStorage.setItem('guest_session_id', data.guest_session_id);
        this.guestSessionId = data.guest_session_id;
      }
    });
  }
}
