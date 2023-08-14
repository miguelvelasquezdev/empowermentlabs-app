import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {}

  signOut() {
    this.supabase.signOut();
  }
}
