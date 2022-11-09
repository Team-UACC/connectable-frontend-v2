import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  return (
    <QueryClientProvider client={queryClient}>
      <ArtistCommentsContainer {...args} />
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 1,
};
