import useEventsByArtistId from '~/hooks/apis/useEventsByArtistIdQuery';

import EventCardList from '../Events/EventCardList';

interface Props {
  id: number;
}

const ArtistEventsListContainer = ({ id }: Props) => {
  const { data: events } = useEventsByArtistId(id);

  return (
    <div className="pb-10">
      <EventCardList events={events ?? []} theme="black" />
    </div>
  );
};

export default ArtistEventsListContainer;
