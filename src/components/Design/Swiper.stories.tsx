import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import EventCard from '../Events/EventCard';

import Swiper from './Swiper';

export default {
  title: 'Design/Swiper',
  component: Swiper,
} as ComponentMeta<typeof Swiper>;

const events = [
  {
    title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
    description: `2년 만에 돌아온 렛츠락 페스티벌!`,
    image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
    saleStatus: '판매중',
    overlap: true,
  },
  {
    title: `Connectable`,
    description: `NFT Ticket at Connectable`,
    image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/welcome-ticket/welcome-ticket.png',
    saleStatus: '판매중',
    overlap: true,
  },
];
const Template: ComponentStory<typeof Swiper> = () => (
  <Swiper>
    {events.map(({ title, description, image, overlap }, idx) => (
      <EventCard
        key={idx}
        title={title}
        description={description}
        image={image}
        saleStatus={'판매중'}
        overlap={overlap}
      />
    ))}
  </Swiper>
);

export const Default = Template.bind({});
Default.args = {};
