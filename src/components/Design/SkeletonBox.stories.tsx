import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import SkeletonBox from './SkeletonBox';

export default {
  title: 'Design/SkeletonBox',
  component: SkeletonBox,
} as ComponentMeta<typeof SkeletonBox>;

const Template: ComponentStory<typeof SkeletonBox> = args => <SkeletonBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 140,
  height: 16,
};

export const Square = Template.bind({});
Square.args = {
  width: 140,
  height: 140,
};

export const Circle = Template.bind({});
Circle.args = {
  width: 140,
  height: 140,
  style: { borderRadius: '9999px' },
};

export const CardExample: ComponentStory<typeof SkeletonBox> = () => {
  return (
    <div role="status" className="flex items-center justify-between w-full px-8 py-4 bg-white max-w-layout">
      <SkeletonBox width={100} height={100} className="mb-2.5" />
      <div className="w-2/3">
        <SkeletonBox width={50} height={8} className="mb-2.5" />
        <SkeletonBox width={150} height={8} className="mb-2.5" />
        <SkeletonBox width={150} height={8} className="mb-2.5" />
        <SkeletonBox width={100} height={8} className="mb-2.5" />
        <SkeletonBox width={120} height={8} className="mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
