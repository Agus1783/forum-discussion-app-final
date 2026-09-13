import Input from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    id: 'username',
    label: 'Username',
    type: 'text',
    value: '',
    onChange: () => {},
    placeholder: 'Masukkan username',
    required: false,
  },
};

export const Required = {
  args: {
    id: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    onChange: () => {},
    placeholder: 'Masukkan email',
    required: true,
  },
};

export const Password = {
  args: {
    id: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    onChange: () => {},
    placeholder: 'Masukkan password',
    required: true,
  },
};
