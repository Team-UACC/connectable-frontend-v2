import { AxiosError } from 'axios';
import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

import { fetchTicketsDetail } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { Ticket } from '~/types/ticketType';

export default function useTicketByIdsQuery(
  eventId: number,
  ticketId: number,
  options?: Omit<UseQueryOptions<Ticket, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.tickets.detailByIds(eventId, ticketId),
    () => fetchTicketsDetail(eventId, ticketId),
    options
  );
}

export const prefetchTicketById = async ({
  queryClient,
  eventId,
  ticketId,
}: {
  queryClient: QueryClient;
  eventId: number;
  ticketId: number;
}) =>
  queryClient.prefetchQuery(queryKeys.tickets.detailByIds(eventId, ticketId), () =>
    fetchTicketsDetail(eventId, ticketId)
  );
