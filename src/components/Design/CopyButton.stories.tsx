import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import CopyButton from './CopyButton';

export default {
  title: 'Design/CopyButton',
  component: CopyButton,
} as ComponentMeta<typeof CopyButton>;

const Template: ComponentStory<typeof CopyButton> = args => <CopyButton {...args} />;

export const White = Template.bind({});
White.parameters = {
  backgrounds: { default: 'black' },
};
White.args = {
  copyTarget: 'copyTargetString',
};
