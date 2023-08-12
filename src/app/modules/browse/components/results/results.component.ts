import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnChanges {
  @Input() text = '';
  imagesUrl = environment.imagesUrl;
  results: any[] = [];

  constructor(private readonly searchService: SearchService) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, 'changes');
    this.searchMovies(changes['text'].currentValue);
  }

  private searchMovies(text: string) {
    this.searchService
      .searchMovies(text)
      .pipe(
        map(data => {
          data.results.forEach((trendingMovie: any) => {
            if (trendingMovie.poster_path) {
              trendingMovie.poster_path = `${this.imagesUrl}/${trendingMovie.poster_path}`;
            }
          });
          console.log(data);
          return data;
        })
      )
      .subscribe(data => {
        this.results = data.results;
        console.log(this.results, 'results');
      });
  }
}
