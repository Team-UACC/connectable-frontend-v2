import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import InputForm from './InputForm';

export default {
  title: 'Design/InputForm',
  component: InputForm,
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = args => <InputForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder',
  handleSubmit: console.log,
};
