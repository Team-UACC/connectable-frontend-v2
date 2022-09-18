import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import OrderTicketCard from './OrderTicketCard';

export default {
  title: 'Tickets/OrderTicketCard',
  component: OrderTicketCard,
} as ComponentMeta<typeof OrderTicketCard>;

const Template: ComponentStory<typeof OrderTicketCard> = args => <OrderTicketCard {...args} />;

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
