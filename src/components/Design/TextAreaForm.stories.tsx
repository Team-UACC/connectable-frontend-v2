import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TextAreaForm from './TextAreaForm';

export default {
  title: 'Design/TextAreaForm',
  component: TextAreaForm,
} as ComponentMeta<typeof TextAreaForm>;

const Template: ComponentStory<typeof TextAreaForm> = args => <TextAreaForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder',
  handleSubmit: console.log,
};
