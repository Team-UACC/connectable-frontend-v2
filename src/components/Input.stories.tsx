import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Input from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '라벨',
  placeholder: 'placeholder',
  description: '도움말',
};

export const Active = Template.bind({});
Active.args = {
  label: '라벨',
  defaultValue: '입력중',
  autoFocus: true,
};

export const Filled = Template.bind({});
Filled.args = {
  label: '라벨',
  defaultValue: '입력완료',
};

export const Error = Template.bind({});
Error.args = {
  label: '라벨',
  defaultValue: '입력완료',
  isError: true,
  description: '에러 메세지',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: '라벨',
  defaultValue: '입력완료',
  disabled: true,
};
