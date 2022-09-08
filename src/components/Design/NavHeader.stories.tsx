import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import NavHeader from './NavHeader';

export default {
  title: 'NavHeader',
  component: NavHeader,
} as ComponentMeta<typeof NavHeader>;

const Template: ComponentStory<typeof NavHeader> = args => <NavHeader {...args} />;

export const Main = Template.bind({});
Main.args = {};

export const MainHasNotification = Template.bind({});
MainHasNotification.args = {
  hasNotificaiton: true,
};

export const SubTransparent = Template.bind({});
SubTransparent.args = {
  type: 'sub-transparent',
};

export const SubWhite = Template.bind({});
SubWhite.args = {
  type: 'sub-white',
  children: '티켓 목록',
};
export const CloseWhite = Template.bind({});
CloseWhite.args = {
  type: 'close-white',
  children: 'NFT 티켓 상세',
};
export const CloseBlack = Template.bind({});
CloseBlack.args = {
  type: 'close-black',
  children: 'QR 입장',
};
