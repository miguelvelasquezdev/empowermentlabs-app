import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
  session_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, session_id`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  addNote(userId: string, mediaId: string, text: string) {
    const randomNumber = this.getRandomNumber(0, 9999999);
    return this.supabase.from('notes').insert({
      id: randomNumber,
      userId,
      mediaId,
      text,
      created_at: new Date(),
    });
  }

  getNotes(userId: string, mediaId: string) {
    return this.supabase
      .from('notes')
      .select()
      .eq('userId', userId)
      .eq('mediaId', mediaId);
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
