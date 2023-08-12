import { Component, OnInit } from '@angular/core';
import { MoviesService } from './services/movies/movies.service';
import { TrendingService } from './services/trending/trending.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'empowermentlabs-movies';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.createRequestToken().subscribe(async (data: any) => {
      console.log(data.request_token, 'data');
    });
  }
}
