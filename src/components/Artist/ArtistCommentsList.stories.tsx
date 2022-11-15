import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ArtistCommentsList from './ArtistCommentsList';

export default {
  title: 'Artist/ArtistCommentsList',
  component: ArtistCommentsList,
} as ComponentMeta<typeof ArtistCommentsList>;

const Template: ComponentStory<typeof ArtistCommentsList> = args => <ArtistCommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: [
    {
      id: 1,
      nickname: '닉네임',
      contents: '작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상',
      writtenAt: new Date(2022, 0, 10).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 2,
      nickname: '닉네임',
      contents: '공연 너무 좋았어요',
      writtenAt: new Date(2022, 0, 9).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
  ],
};
