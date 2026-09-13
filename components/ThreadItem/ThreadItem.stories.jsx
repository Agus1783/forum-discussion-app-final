import ThreadItem from './index';

const meta = {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
};

export default meta;

const mockThread = {
  id: 'thread-1',
  title: 'Bagaimana cara belajar React dengan efektif?',
  body: 'Saya sedang belajar React dan ingin mengetahui tips belajar yang efektif untuk pemula.',
  category: 'react',
  createdAt: '2025-03-11T09:44:00.000Z',
  ownerId: 'user-1',
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: ['user-4'],
};

const mockOwner = {
  id: 'user-1',
  name: 'Dimas Saputra',
  email: 'dimas@example.com',
  avatar: '',
};

export const Default = {
  args: {
    thread: mockThread,
    owner: mockOwner,
  },
};
