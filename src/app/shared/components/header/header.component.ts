import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  session = this.supabase.session;
  constructor(public supabase: SupabaseService) {}
}
