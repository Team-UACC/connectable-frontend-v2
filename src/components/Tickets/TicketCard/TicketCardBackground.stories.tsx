import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TicketCardBackground from './TicketCardBackground';

export default {
  title: 'Tickets/TicketCardBackground',
  component: TicketCardBackground,
} as ComponentMeta<typeof TicketCardBackground>;

const Template: ComponentStory<typeof TicketCardBackground> = args => <TicketCardBackground {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const RightCutout = Template.bind({});
RightCutout.args = {
  cutout: 'right',
};

export const BorderPink = Template.bind({});
BorderPink.args = {
  borderColor: 'pink',
};

export const ShadowPink = Template.bind({});
ShadowPink.args = {
  shadowColor: 'pink',
};

export const BorderShadowPink = Template.bind({});
BorderShadowPink.args = {
  borderColor: 'pink',
  shadowColor: 'pink',
};
