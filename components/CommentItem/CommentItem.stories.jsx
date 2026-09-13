import CommentItem from './index';

const meta = {
  title: 'Components/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
};

export default meta;

const mockComment = {
  id: 'comment-1',
  content: 'Saya juga sedang belajar React. Menurut saya, latihan membuat project kecil sangat membantu.',
  createdAt: '2025-03-11T09:44:00.000Z',
  owner: {
    id: 'user-1',
    name: 'Dimas Saputra',
    avatar: '',
  },
};

export const Default = {
  args: {
    comment: mockComment,
  },
};
