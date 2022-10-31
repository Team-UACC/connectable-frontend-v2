import { Artist } from '~/types/artistType';

import { axiosInstance } from '.';

export const fetchAllArtists = async (): Promise<Array<Artist>> => {
  return axiosInstance.get(`/artists`);
};

export const fetchArtistById = async (artistId: number): Promise<Artist> => {
  return axiosInstance.get(`/artist/${artistId}`);
};
