import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import NavFooter from './NavFooter';

export default {
  title: 'Design/NavFooter',
  component: NavFooter,
} as ComponentMeta<typeof NavFooter>;

const Template: ComponentStory<typeof NavFooter> = args => <NavFooter {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const TabIcon = Template.bind({});
TabIcon.args = {
  selected: 'events',
};
