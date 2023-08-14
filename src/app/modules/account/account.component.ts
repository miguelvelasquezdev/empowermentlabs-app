import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signOut() {
    this.supabase.signOut();
    this.router.navigate(['/']);
  }
}
