import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { MovieResult, TVShowResult } from 'src/app/types/shared';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent<T extends MovieResult | TVShowResult> {
  @Input() mediaItems: T[] = [];
  @Output() onFavoriteMedia = new EventEmitter<T>();

  constructor(public supabase: SupabaseService) {}

  favoriteMedia(mediaItem: T) {
    this.onFavoriteMedia.emit(mediaItem);
  }
}
