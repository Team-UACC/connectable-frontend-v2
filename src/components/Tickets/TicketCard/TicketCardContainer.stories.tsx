import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TicketCardContainer from './TicketCardContainer';

export default {
  title: 'Tickets/TicketCardContainer',
  component: TicketCardContainer,
} as ComponentMeta<typeof TicketCardContainer>;

const Template: ComponentStory<typeof TicketCardContainer> = args => <TicketCardContainer {...args} />;

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
