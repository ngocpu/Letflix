export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type?: "movie";
  adult?: boolean;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
  release_date: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Cast {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface Videos {
  iso_639_1?: string;
  iso_3166_1?: string;
  name: string;
  key: string;
  site?: string;
  size?: number;
  type?: string;
  official?: boolean;
  published_at?: string;
  id: string;
}
