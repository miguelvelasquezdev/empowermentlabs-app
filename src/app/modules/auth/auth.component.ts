import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  });

  private session = this.supabase.session;

  constructor(
    private readonly authService: AuthService,
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.supabase.authChanges(async (_, session) => (this.session = session));
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error, data } = await this.supabase.signIn(email);

      if (error) throw error;

      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
