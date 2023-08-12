import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sessionId: string | null = '';

  constructor(
    private readonly authService: AuthService,
    private activateRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activateRoute.paramMap.subscribe(obs => {
      console.log(obs.get('request_token'), 'query');
    });
    this.sessionId = localStorage.getItem('session_id');
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(query => {
      const requestToken = query['request_token'];

      if (requestToken) {
        this.authService.createSession(requestToken).subscribe(data => {
          console.log(data, 'session');
          if (!localStorage.getItem('session_id')) {
            localStorage.setItem('session_id', data.session_id);
            this.sessionId = data.session_id;
          }
        });
      }
    });
  }

  askPermission() {
    this.authService.createRequestToken().subscribe(async data => {
      console.log(data, 'data???????');
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://localhost:4200`;
    });
  }
}
