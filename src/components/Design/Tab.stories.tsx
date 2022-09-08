import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Tab from './Tab';

export default {
  title: 'Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = args => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  titles: ['이벤트', '방명록'],
  children: [
    <ul key={1}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>,
    <ul key={2}>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
    </ul>,
  ],
};
