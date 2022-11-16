import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Comment from './Comment';

export default {
  title: 'Design/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = args => (
  <div className="relative max-w-[432px]">
    <Comment {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  profileImage: '/icons/default_profile.svg',
  userName: '닉네임',
  contents: '작성한 방명록이 두 줄 이상일 경우에는 다음과 같이 표시합니다. 두 줄 이상',
  writtenAt: '2022.01.10',
  additional: '[콘서트] 숲 Seat No.A4',
};
