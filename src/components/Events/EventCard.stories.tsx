import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import EventCard from './EventCard';

export default {
  title: 'Events/EventCard',
  component: EventCard,
} as ComponentMeta<typeof EventCard>;

const Template: ComponentStory<typeof EventCard> = args => (
  <div className="max-w-[400px]">
    <EventCard {...args} />
  </div>
);

export const OVERLAP_ONSALE = Template.bind({});
OVERLAP_ONSALE.args = {
  title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
  description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
  image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
  saleStatus: `판매중`,
  overlap: true,
};

export const OVERLAP_Finish = Template.bind({});
OVERLAP_Finish.args = {
  title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
  description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
  image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
  saleStatus: `판매종료`,
  overlap: true,
};

export const ONSALE = Template.bind({});
ONSALE.parameters = {
  backgrounds: { default: 'black' },
};
ONSALE.args = {
  title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
  description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
  image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
  saleStatus: `판매중`,
  overlap: false,
};

export const ONSALE_FINISH = Template.bind({});
ONSALE_FINISH.parameters = {
  backgrounds: { default: 'black' },
};
ONSALE_FINISH.args = {
  title: `LET'S ROCK FESTIVAL 2022 NFT Ticket (2일권)`,
  description: ` 2년 만에 돌아온 렛츠락 페스티벌!`,
  image: `https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg`,
  saleStatus: `판매종료`,
  overlap: false,
};
