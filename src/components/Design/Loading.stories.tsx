import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Design/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = args => <LoadingSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
