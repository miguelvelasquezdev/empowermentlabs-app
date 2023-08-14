import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { SupabaseService } from './services/supabase/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'empowermentlabs-movies';

  constructor(
    private supabase: SupabaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.supabase.authChanges(async (_, session) => {
      try {
        if (session) {
          const user = session.user;
          const profile = await this.supabase.profile(user);

          if (!profile.data?.session_id) {
            this.authService.createGuestSession().subscribe(async data => {
              const { error: updateError, data: other } =
                await this.supabase.updateProfile({
                  id: user.id,
                  username: 'miguel',
                  website: '',
                  avatar_url: '',
                  session_id: data.guest_session_id,
                });

              if (updateError) throw updateError;
            });
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
  }
}
