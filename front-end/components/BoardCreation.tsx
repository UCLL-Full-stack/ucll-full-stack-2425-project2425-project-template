'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/board.module.css';
import { KanbanPermission, DiscordPermission, ValidationErrors, Board } from '../types';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: string[];
  data?: Board;
}

interface BoardCreateData {
  boardId?: string;
  boardName: string;
  description?: string;
  createdByUser: {
    userId: string;
    username: string;
    userTag: string;
  };
  guild: {
    guildId: string;
    guildName: string;
  };
  columns: {
    columnName: string;
    tasks: never[];
  }[];
  permissions?: {
    identifier: DiscordPermission;
    kanbanPermission: KanbanPermission[];
  }[];
}

const DEFAULT_COLUMNS = [
  { columnName: 'To Do', tasks: [] },
  { columnName: 'In Progress', tasks: [] },
  { columnName: 'Done', tasks: [] }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const BoardCreation = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    boardName: '',
    description: '',
    touched: {
      boardName: false,
      description: false,
    },
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Fetch existing boards on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`${API_URL}/api/boards/guild/guild1`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setBoards(data);
        }
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      }
    };

    fetchBoards();
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'boardName':
        if (!value.trim()) return 'Board Name is required';
        if (value.length < 3) return 'Board Name must be at least 3 characters long';
        if (value.length > 50) return 'Board Name must be less than 50 characters';
        if (!/^[a-zA-Z0-9\s-_]+$/.test(value)) {
          return 'Board name can only contain letters, numbers, spaces, hyphens, and underscores';
        }
        break;
      case 'description':
        if (value && value.length > 500) return 'Description must be less than 500 characters';
        break;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    const boardNameError = validateField('boardName', formState.boardName);
    if (boardNameError) newErrors.boardName = boardNameError;
    
    const descriptionError = validateField('description', formState.description);
    if (descriptionError) newErrors.description = descriptionError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createBoard = async (boardData: BoardCreateData): Promise<ApiResponse> => {
    try {
      console.log('Sending board data:', boardData);
      const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(boardData),
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (!response.ok) {
        switch (response.status) {
          case 400:
            return { 
              success: false, 
              errors: Array.isArray(data.errors) ? data.errors : [data.error],
              error: 'Validation failed' 
            };
          case 401:
            return { 
              success: false, 
              error: 'Unauthorized. Please check your permissions.' 
            };
          case 403:
            return { 
              success: false, 
              error: 'You do not have permission to create boards.' 
            };
          default:
            throw new Error(data.message || 'Failed to create board');
        }
      }

      return { success: true, data };
    } catch (error) {
      console.error('Board creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: value,
      touched: { ...prev.touched, [name]: true }
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
      general: undefined
    }));

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const boardData: BoardCreateData = {
        boardName: formState.boardName.trim(),
        description: formState.description.trim() || undefined,
        createdByUser: {
          userId: 'user1',
          username: 'Test User',
          userTag: 'test#1234'
        },
        guild: {
          guildId: 'guild1',
          guildName: 'Test Guild'
        },
        columns: DEFAULT_COLUMNS,
        permissions: [
          {
            identifier: DiscordPermission.ADMINISTRATOR,
            kanbanPermission: [KanbanPermission.ADMINISTRATOR]
          }
        ]
      };

      const result = await createBoard(boardData);

      if (result.success && result.data) {
        // Ensure the board has the required properties before adding to state
        const newBoard: Board = {
          ...result.data,
          columns: result.data.columns || [],
          permissions: result.data.permissions || []
        };

        setBoards(prev => [...prev, newBoard]);
        setSuccessMessage('Board created successfully!');
        
        setFormState({
          boardName: '',
          description: '',
          touched: {
            boardName: false,
            description: false,
          }
        });
        
        setTimeout(() => {
          setIsCreating(false);
          setSuccessMessage('');
        }, 1500);
      } else {
        if (result.errors) {
          const formErrors: ValidationErrors = {};
          result.errors.forEach(error => {
            if (error.toLowerCase().includes('board name')) {
              formErrors.boardName = error;
            } else {
              formErrors.general = error;
            }
          });
          setErrors(formErrors);
        } else {
          setErrors({
            general: result.error || 'Failed to create board'
          });
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to create board'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.successToast} onClick={() => setSuccessMessage('')}>
          {successMessage}
        </div>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>Kanban Boards</h1>
        <button
          onClick={() => setIsCreating(true)}
          className={styles.button}
          disabled={isLoading}
        >
          + New Board
        </button>
      </div>

      <div className={styles.boardsList}>
        {Array.isArray(boards) && boards.map((board) => board && (
          <div key={board.boardId || Math.random()} className={styles.boardCard}>
            <h3 className={styles.boardTitle}>{board.boardName}</h3>
            <p className={styles.boardInfo}>
              {board.columns?.length || 0} {(board.columns?.length || 0) === 1 ? 'column' : 'columns'}
            </p>
            {board.description && (
              <p className={styles.boardDescription}>{board.description}</p>
            )}
          </div>
        ))}
      </div>

      {isCreating && (
        <div className={styles.modal} onClick={() => !isLoading && setIsCreating(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Create New Board</h2>
            
            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Board Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="boardName"
                  value={formState.boardName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.boardName && formState.touched.boardName ? styles.inputError : ''
                  }`}
                  placeholder="Enter board name (3-50 characters)"
                  disabled={isLoading}
                />
                {errors.boardName && formState.touched.boardName && (
                  <div className={styles.fieldError}>{errors.boardName}</div>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Description (Optional)</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Enter board description"
                  disabled={isLoading}
                  rows={3}
                />
                {errors.description && formState.touched.description && (
                  <div className={styles.fieldError}>{errors.description}</div>
                )}
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => !isLoading && setIsCreating(false)}
                  className={styles.cancelButton}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`${styles.createButton} ${isLoading ? styles.loading : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCreation;