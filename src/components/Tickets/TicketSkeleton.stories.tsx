import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TicketSkeleton from './TicketSkeleton';

export default {
  title: 'Tickets/TicketSkeleton',
  component: TicketSkeleton,
} as ComponentMeta<typeof TicketSkeleton>;

const Template: ComponentStory<typeof TicketSkeleton> = () => <TicketSkeleton />;

export const Default = Template.bind({});
