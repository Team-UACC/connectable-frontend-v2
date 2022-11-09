import useEventsByArtistId from '~/hooks/apis/useEventsByArtistId';

import EventCardList from '../Events/EventCardList';

interface Props {
  id: number;
}

const ArtistEventsListContainer = ({ id }: Props) => {
  const { data: events } = useEventsByArtistId(id);

  return <EventCardList events={events ?? []} />;
};

export default ArtistEventsListContainer;
