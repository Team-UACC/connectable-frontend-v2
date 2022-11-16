import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchEventsByArtistId } from '~/apis/artists';
import queryKeys from '~/constants/queryKeys';
import { EventSimpleType } from '~/types/eventType';

export default function useEventsByArtistIdQuery(
  artistId: number,
  options?: Omit<UseQueryOptions<Array<EventSimpleType>, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.events.byArtist(artistId), () => fetchEventsByArtistId(artistId), options);
}
