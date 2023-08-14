export interface Movies {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface TVShows {
  page: number;
  results: TVShowResult[];
  total_pages: number;
  total_results: number;
}

export type MovieResult = ResultBase & {
  title: string;
  original_title: string;
  release_date: Date;
  video: boolean;
};

export type TVShowResult = ResultBase & {
  name: string;
  title?: string;
  origin_country: string[];
  original_title: string;
};

export interface ResultBase {
  favorite?: boolean;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
