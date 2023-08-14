import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  imagesUrl = environment.imagesUrl;
  detail: any = null;
  note = new FormControl<string>('');

  constructor(
    public supabase: SupabaseService,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(obs => {
      this.moviesService
        .getMovie(obs.get('id') as string)
        .pipe(
          map(detail => {
            detail.backdrop_path = `${this.imagesUrl}/${detail.backdrop_path}`;
            detail.poster_path = `${this.imagesUrl}/${detail.poster_path}`;

            return detail;
          })
        )
        .subscribe(detail => {
          this.detail = detail;
        });
    });
  }

  async addNote() {
    try {
      const userId = this.supabase.session?.user.id;
      if (!userId) {
        throw Error('User is not signed out');
      }
      if (!this.note.value) {
        throw Error('The note must have at least 1 character');
      }
      await this.supabase.addNote(userId, this.note.value);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
}
