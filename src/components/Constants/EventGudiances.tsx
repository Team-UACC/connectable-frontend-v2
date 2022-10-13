import BookingGuidance from './lets-rock/BookingGuidance';
import EntranceGuidance from './lets-rock/EntranceGuidance';
import EtcGuidance from './lets-rock/EtcGuidance';
import { LETS_ROCK } from './lets-rock/metadata';
import RefundGuidance from './lets-rock/RefundGuidance';
import { AdditionalGuidance } from './welcome-connectable/AddtionalGuidance';

const EventGuidances = ({ eventName }: { eventName: string }) => {
  return (
    <>
      {eventName === LETS_ROCK.name && (
        <>
          <BookingGuidance />
          <RefundGuidance />
          <EntranceGuidance />
          <EtcGuidance />
        </>
      )}
      {eventName === 'Connectale 웰컴 티켓' && <AdditionalGuidance />}
    </>
  );
};

export default EventGuidances;
