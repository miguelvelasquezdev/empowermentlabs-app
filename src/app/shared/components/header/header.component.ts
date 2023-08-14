import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService) {
    console.log();
  }

  signInAsGuest() {
    this.authService.createGuestSession().subscribe(async data => {
      if (!this.authService.sessionId$.value) {
        localStorage.setItem('guest_session_id', data.guest_session_id);
        this.authService.sessionId$.next(data.guest_session_id);
      }
    });
  }
}
