import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import queryKeys from '~/constants/queryKeys';

import ArtistCommentsContainer from './ArtistCommentsContainer';

export default {
  title: 'Artist/ArtistCommentsContainer',
  component: ArtistCommentsContainer,
} as ComponentMeta<typeof ArtistCommentsContainer>;

const Template: ComponentStory<typeof ArtistCommentsContainer> = args => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  queryClient.setQueryData(queryKeys.artist.comment(1), [
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
    {
      id: 3,
      nickname: '닉네임',
      contents: '공연 너무 좋았어요',
      writtenAt: new Date(2022, 0, 9).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 4,
      nickname: '닉네임',
      contents:
        '작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상. 작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상.',
      writtenAt: new Date(2022, 0, 5).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 5,
      nickname: '닉네임',
      contents: '공연 너무 좋았어요',
      writtenAt: new Date(2022, 0, 9).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 6,
      nickname: '닉네임',
      contents:
        '작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상. 작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상.',
      writtenAt: new Date(2022, 0, 5).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 7,
      nickname: '닉네임',
      contents: '공연 너무 좋았어요',
      writtenAt: new Date(2022, 0, 9).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
    {
      id: 8,
      nickname: '닉네임',
      contents:
        '작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상. 작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상.',
      writtenAt: new Date(2022, 0, 5).getTime(),
      ticketMetadata: {
        image: '',
        name: '[콘서트] 숲 Seat No.A4',
        description: '',
      },
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ArtistCommentsContainer {...args} />
      <Toaster containerStyle={{ top: 300 }} toastOptions={{ duration: 3000 }} />
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 1,
};
