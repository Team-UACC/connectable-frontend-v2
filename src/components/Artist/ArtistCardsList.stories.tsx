import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ArtistCardsList from './ArtistCardsList';

export default {
  title: 'Artist/ArtistCardsList',
  component: ArtistCardsList,
} as ComponentMeta<typeof ArtistCardsList>;

const Template: ComponentStory<typeof ArtistCardsList> = args => <ArtistCardsList {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: { default: 'black' },
};
Default.args = {
  artists: [
    {
      id: 1,
      image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/welcome-ticket/welcome-ticket.png',
      name: 'Connectable',
    },
    {
      id: 2,
      image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg',
      name: '렛츠락 페스티벌',
    },
  ],
};
