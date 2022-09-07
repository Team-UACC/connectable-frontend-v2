import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Black = Template.bind({});
Black.args = {
  children: '티켓 선택',
  color: 'black',
};

export const BlackDisabled = Template.bind({});
BlackDisabled.args = {
  children: '티켓 선택',
  color: 'black',
  disabled: true,
};

export const White = Template.bind({});
White.args = {
  children: '마이페이지로 이동',
  color: 'white',
};

export const WhiteDisabled = Template.bind({});
WhiteDisabled.args = {
  children: '마이페이지로 이동',
  color: 'white',
  disabled: true,
};
