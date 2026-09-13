import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    children: 'Button',
    type: 'button',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    children: 'Button Disabled',
    type: 'button',
    disabled: true,
  },
};
