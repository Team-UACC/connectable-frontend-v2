import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Counter from './Counter';

export default {
  title: 'Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = args => <Counter {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Max4 = Template.bind({});
Max4.args = {
  max: 4,
};
