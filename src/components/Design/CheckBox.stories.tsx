import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import CheckBox from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = args => <CheckBox {...args} />;

export const Square = Template.bind({});
Square.args = {
  label: '라벨',
  id: 'id',
  shape: 'square',
};

export const Circle = Template.bind({});
Circle.args = {
  label: '라벨',
  id: 'id',
  shape: 'circle',
};
