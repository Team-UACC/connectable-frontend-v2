import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import BodyText from './BodyText';

export default {
  title: 'BodyText',
  component: BodyText,
} as ComponentMeta<typeof BodyText>;

const Template: ComponentStory<typeof BodyText> = args => <BodyText {...args} />;

export const Large = Template.bind({});
Large.args = {
  children: 'SUIT / regular / 사이즈 18 / 행간 28',
  className: 'text-lg',
};

export const Base = Template.bind({});
Base.args = {
  children: 'SUIT / regular / 사이즈 16 / 행간 24',
  className: 'text-base',
};
export const Small = Template.bind({});
Small.args = {
  children: 'SUIT / regular / 사이즈 14 / 행간 20',
  className: 'text-sm',
};

export const XSmall = Template.bind({});
XSmall.args = {
  children: 'SUIT / regular / 사이즈 12 / 행간 16',
  className: 'text-xs',
};
