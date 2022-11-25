import { AxiosError } from 'axios';
import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

import { fetchAllEvents } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { EventSimpleType } from '~/types/eventType';

export default function useAllEvents(
  options?: Omit<UseQueryOptions<Array<EventSimpleType>, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.events.all, fetchAllEvents, options);
}

export const prefetchAllEvents = async ({ queryClient }: { queryClient: QueryClient }) =>
  queryClient.prefetchQuery(queryKeys.events.all, fetchAllEvents);
