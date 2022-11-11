export interface Artist {
  id: number;
  image: string;
  name: string;
}

type Notice = {
  contents: string;
  noticeStatus: string;
  title: string;
};

export interface ArtistDetail extends Artist {
  description: string;

  twitterUrl?: string;
  instagramUrl?: string;
  webpageUrl?: string;

  notice: Notice;
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
