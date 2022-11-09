import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchCommentsByArtistId } from '~/apis/artists';
import queryKeys from '~/constants/queryKeys';
import { ArtistComment } from '~/types/artistType';

export default function useArtistCommentById(
  artistId: number,
  options?: Omit<UseQueryOptions<Array<ArtistComment>, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.artist.comment(artistId), () => fetchCommentsByArtistId(artistId), options);
}
