import { Artist, ArtistComment, ArtistDetail } from '~/types/artistType';
import { EventSimpleType } from '~/types/eventType';

import { authorizationOptions, axiosInstance } from '.';

export const fetchAllArtists = async (): Promise<Array<Artist>> => {
  return axiosInstance.get(`/artists`);
};

export const fetchArtistById = async (artistId: number): Promise<ArtistDetail> => {
  return axiosInstance.get(`/artists/${artistId}`);
};

export const fetchEventsByArtistId = async (artistId: number): Promise<Array<EventSimpleType>> => {
  return axiosInstance.get(`/artists/${artistId}/events`);
};

export const fetchCommentsByArtistId = async (artistId: number): Promise<Array<ArtistComment>> => {
  return axiosInstance.get(`/artists/${artistId}/comments`);
};

export const createArtistComment = async (artistId: number, contents: string): Promise<void> => {
  return axiosInstance.post(`/artists/${artistId}/comments`, JSON.stringify({ contents }), authorizationOptions());
};

export const fetchIsArtistNftOwner = async (artistId: number): Promise<{ isNftHolder: boolean }> => {
  return axiosInstance.get(`/artists/${artistId}/owner`, authorizationOptions());
};

export const deleteArtistComment = async (artistId: number, commentId: number): Promise<void> => {
  return axiosInstance.delete(`/artists/${artistId}/comments?commentId=${commentId}`);
};
