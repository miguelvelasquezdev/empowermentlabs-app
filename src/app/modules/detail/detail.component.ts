import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { Note } from 'src/app/types/notes';
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
  notes: Partial<Note>[] = [];

  constructor(
    public supabase: SupabaseService,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    const userId = this.supabase.session?.user.id;
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
        .subscribe(async detail => {
          this.detail = detail;

          if (userId) {
            const { error, data } = await this.supabase.getNotes(
              userId!,
              this.detail.id
            );

            if (error) {
              throw Error(
                'Something wrod has happened trying to retreive the notes'
              );
            }

            this.notes = data as Note[];
          }
        });
    });
  }

  async addNote(mediaId: string) {
    try {
      const userId = this.supabase.session?.user.id;
      if (!userId) {
        throw Error('User is not signed out');
      }
      if (!this.note.value) {
        throw Error('The note must have at least 1 character');
      }
      await this.supabase.addNote(userId, mediaId, this.note.value);
      this.notes.push({
        text: this.note.value,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
}
