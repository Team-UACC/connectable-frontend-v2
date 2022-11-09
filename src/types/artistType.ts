export interface Artist {
  id: number;
  image: string;
  name: string;
}

export interface ArtistDetail extends Artist {
  description: string;

  twitterUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;

  notification: string;
}

interface Comment {
  contents: string;
  nickname: string;
  writtenAt: number;
}

export interface ArtistComment extends Comment {
  id: number;
  ticketName: string;
}
