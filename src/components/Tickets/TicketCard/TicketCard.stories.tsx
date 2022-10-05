import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TicketCard from './TicketCard';

export default {
  title: 'Tickets/TicketCard',
  component: TicketCard,
} as ComponentMeta<typeof TicketCard>;

const Template: ComponentStory<typeof TicketCard> = args => <TicketCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  ticketData: {
    id: 1,
    price: 100000,
    artistName: 'artistName',
    eventDate: new Date(2022, 12, 25).getTime(),
    eventName: 'eventName',
    ticketSalesStatus: 'ON_SALE',
    tokenId: 1,
    tokenURI: '',
    metadata: {
      name: '[콘서트] 숲 Seat No.A2',
      description: '[콘서트] 숲 Seat No.A2',
      image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg',
    },
  },
};
