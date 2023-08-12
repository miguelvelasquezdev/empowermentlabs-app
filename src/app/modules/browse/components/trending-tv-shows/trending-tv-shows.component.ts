import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending-tv-shows',
  templateUrl: './trending-tv-shows.component.html',
  styleUrls: ['./trending-tv-shows.component.css'],
})
export class TrendingTvShowsComponent implements OnInit {
  trendingTVShows: any[] = [];
  imagesUrl = environment.imagesUrl;

  constructor(private trendingService: TrendingService) {}

  ngOnInit() {
    this.trendingService
      .getTVShows()
      .pipe(
        map(data => {
          data.results.forEach((trendingTVShow: any) => {
            trendingTVShow.poster_path = `${this.imagesUrl}/${trendingTVShow.poster_path}`;
          });
          console.log(data);
          return data;
        })
      )
      .subscribe(data => {
        this.trendingTVShows = data.results;
      });
  }
}
