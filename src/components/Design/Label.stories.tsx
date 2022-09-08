import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Label from './Label';

export default {
  title: 'Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = args => <Label {...args} />;

export const Pink = Template.bind({});
Pink.args = {
  color: 'pink',
  title: 'ARTIST',
};

export const White = Template.bind({});
White.args = {
  color: 'white',
  title: 'ARTIST',
};

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
  title: 'ARTIST',
};
