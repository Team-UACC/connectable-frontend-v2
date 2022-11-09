import { Artist, ArtistComment } from '~/types/artistType';
import { EventSimpleType } from '~/types/eventType';

import { axiosInstance } from '.';

export const fetchAllArtists = async (): Promise<Array<Artist>> => {
  return axiosInstance.get(`/artists`);
};

export const fetchArtistById = async (artistId: number): Promise<Artist> => {
  return axiosInstance.get(`/artist/${artistId}`);
};

export const fetchEventsByArtistId = async (artistId: number): Promise<Array<EventSimpleType>> => {
  return axiosInstance.get(`/artists/${artistId}/events`);
};

export const fetchCommentsByArtistId = async (artistId: number): Promise<Array<ArtistComment>> => {
  return axiosInstance.get(`/artists/${artistId}/comments`);
};

export const createArtistComment = async (artistId: number, contents: string): Promise<void> => {
  return axiosInstance.post(`/artists/${artistId}/comments`, JSON.stringify(contents));
};
