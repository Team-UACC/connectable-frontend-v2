import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import SpeechBubble from './SpeechBubble';

export default {
  title: 'Design/SpeechBubble',
  component: SpeechBubble,
} as ComponentMeta<typeof SpeechBubble>;

const Template: ComponentStory<typeof SpeechBubble> = args => <SpeechBubble {...args} />;

export const Pink = Template.bind({});
Pink.args = {
  children: (
    <span>
      판매 종료까지 <b>03일 06시간 10분 00초</b>
    </span>
  ),
};

export const Gray = Template.bind({});
Gray.args = {
  color: 'gray',
  children: '판매가 종료되었습니다. 다음에 만나요!',
};
