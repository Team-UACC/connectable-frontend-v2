import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Badge from './Badge';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Black_Large = Template.bind({});
Black_Large.args = {
  name: '판매중',
  size: 'lg',
};

export const Black_Small = Template.bind({});
Black_Small.args = {
  name: '판매중',
};

export const Black_Opacity = Template.bind({});
Black_Opacity.args = {
  name: '판매종효',
  opacity: true,
};

export const White_Large = Template.bind({});
White_Large.parameters = {
  backgrounds: { default: 'black' },
};
White_Large.args = {
  name: '판매중',
  size: 'lg',
  color: 'white',
};

export const White_Small = Template.bind({});
White_Small.parameters = {
  backgrounds: { default: 'black' },
};
White_Small.args = {
  name: '판매중',
  color: 'white',
};

export const White_Opacity = Template.bind({});
White_Opacity.parameters = {
  backgrounds: { default: 'black' },
};
White_Opacity.args = {
  name: '판매종료',
  opacity: true,
  color: 'white',
};
