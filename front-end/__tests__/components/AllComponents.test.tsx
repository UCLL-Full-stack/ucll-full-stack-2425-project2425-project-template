import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from '../../components/board/Task';
import Column from '../../components/board/Column';
import BoardView from '../../components/board/BoardView';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import BoardCard from '../../components/dashboard/BoardCard';
import CreateBoardForm from '../../components/dashboard/CreateBoardForm';
import EditBoard from '../../components/dashboard/EditBoard';

const defaultPermissions = {
  canDeleteColumns: false,
  canEditColumns: false,
  canCreateTasks: false,
  canEditTasks: false,
  canDeleteTasks: false,
  canAssignTasks: false,
  canEditAssignees: false,
  canEditTaskStatus: false,
};

// Task Component Test
describe('Task Component', () => {
  test('renders Task with correct title and description', () => {
    render(
      <Task 
        task={{
          taskId: '1',
          title: 'Test Task',
          description: 'Task Description',
          columnId: '1',
          taskIndex: 1,
          dueDate: '2024-12-31',
          assigneeIds: []
        }}
        index={0}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        permissions={defaultPermissions}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
  });
});

// Column Component Test
describe('Column Component', () => {
  test('renders Column with correct title', () => {
    render(
      <Column
        column={{
          boardId: '1',
          columnId: '1',
          columnName: 'To Do',
          columnIndex: 1,
          taskIds: []
        }}
        onDelete={() => {}}
        onTaskChange={() => {}}
        permissions={defaultPermissions}
      />
    );

    expect(screen.getByText('To Do')).toBeInTheDocument();
  });
});

// BoardView Component Test
describe('BoardView Component', () => {
  test('renders BoardView with columns', () => {
    const board = {
      boardId: '1',
      boardName: 'Test Board',
      createdByUserId: 'user1',
      guildId: 'guild1',
      columnIds: ['1', '2'],
      permissions: [],
    };
    render(
      <BoardView 
        board={board}
        onAddColumn={() => {}}
        onDeleteColumn={() => {}}
      />
    );

    expect(screen.getByText('Test Board')).toBeInTheDocument();
  });
});

// LanguageSwitcher Component Test
describe('LanguageSwitcher Component', () => {
  test('renders language options', () => {
    render(<LanguageSwitcher />);
  });
});

// BoardCard Component Test
describe('BoardCard Component', () => {
  test('renders BoardCard with correct title', () => {
    render(
      <BoardCard
        board={{
          boardId: '1',
          boardName: 'Project Board',
          createdByUserId: 'user1',
          guildId: 'guild1',
          columnIds: [],
          permissions: []
        }}
        onDelete={() => {}}
        onEdit={() => {}}
        onEditPermissions={() => {}}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText('Project Board')).toBeInTheDocument();
  });
});

// CreateBoardForm Component Test
describe('CreateBoardForm Component', () => {
  test('renders CreateBoardForm fields', () => {
    render(
      <CreateBoardForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        user={{
          userId: '1',
          username: 'Test User',
          globalName: 'Test User',
          guildIds: [],
          userAvatar: 'default-avatar.png'
        }}
        guilds={[]}
        permissions={[]}
      />
    );
  });
});

// EditBoard Component Test
describe('EditBoard Component', () => {
  test('renders EditBoard', () => {
    render(
      <EditBoard 
        boardId="1" 
        onClose={() => {}} 
        onSubmit={() => {}}
      />
    );
  });
});