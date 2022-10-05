import Image from 'next/image';

import { EventInfos } from '~/components/Events/EventPage/EventInfoSection';
import NFTCollectionInfoSection from '~/components/Events/EventPage/NFTCollectionInfoSection';
import Paragraph from '~/components/Text/Paragraph';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { EventDetailType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';

import { TicketSalesInfo } from '../TicketCard/TicketCard';

interface Props {
  eventDetail: EventDetailType;
  ticketDetail: Ticket;
}

const TicketDetailArticle = ({ ticketDetail, eventDetail }: Props) => {
  return (
    <article className="pb-[88px] bg-white divide-y-[12px] divide-[#F5F5F5]">
      <div>
        <section className="relative w-full max-h-[428px]">
          <Image
            src={'/images/hologram.svg'}
            alt="bg"
            layout="responsive"
            width={428}
            height={428}
            className="scale-[120%]"
          />
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-max drop-shadow-[6px_6px_18px_rgba(0,0,0,0.25)]">
            <Image
              src={ticketDetail!.metadata.image}
              alt={'ticket'}
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
        </section>
        <div className="px-[18px] pt-6 pb-5">
          <section className="flex flex-col w-full gap-3">
            <TicketSalesInfo ticketData={ticketDetail} badgeSize="lg" fontSize="lg" />
          </section>
          <section>
            <EventInfos size={18} startTime={eventDetail.startTime} location={eventDetail.location} />
          </section>
        </div>
      </div>
      <div>
        <section className="px-4 py-6">
          <Paragraph title="공연 설명">{eventDetail.description}</Paragraph>
        </section>

        <NFTCollectionInfoSection
          contractAddress={eventDetail.contractAddress}
          openseaUrl={eventDetail.contractAddress}
          ownedBy={ticketDetail?.ownedBy}
          tokenId={ticketDetail.tokenId}
        />
      </div>
    </article>
  );
};

export default TicketDetailArticle;
