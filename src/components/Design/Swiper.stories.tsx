import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Swiper from './Swiper';

export default {
  title: 'Swiper',
  component: Swiper,
} as ComponentMeta<typeof Swiper>;

const Template: ComponentStory<typeof Swiper> = args => <Swiper {...args} />;

export const Default = Template.bind({});
Default.args = {};
