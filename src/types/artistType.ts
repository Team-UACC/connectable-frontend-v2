export interface Artist {
  id: number;
  image: string;
  name: string;
}

export interface ArtistDetail extends Artist {
  description: string;
}
