'use client';

import React, { useState } from 'react';
import styles from '../styles/board.module.css';
import { KanbanPermission, DiscordPermission, ValidationErrors, Board, Column } from '../types/index';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

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

  // Validation functions
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'boardName':
        if (!value.trim()) return 'Board Name is required';
        if (value.length < 3) return 'Board Name must be at least 3 characters long';
        if (value.length > 50) return 'Board Name must be less than 50 characters';
        break;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const boardNameError = validateField('boardName', formState.boardName);
    if (boardNameError) newErrors.boardName = boardNameError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API functions
  const createBoard = async (boardData: Partial<Board>): Promise<ApiResponse> => {
    try {
      const response = await fetch('http://localhost:8080/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create board');
      }

      return { success: true, data };
    } catch (error) {
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

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Clear success message if any
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Prepare board data
      const boardData: Partial<Board> = {
        boardName: formState.boardName,
        description: formState.description,
        createdByUser: {
          userId: 'user1', // This would come from auth context
          username: 'Test User',
          userTag: 'test#1234'
        },
        guild: {
          guildId: 'guild1', // This would come from props/context
          guildName: 'Test Guild'
        },
        columns: [
          {
            columnId: `col-${Date.now()}`,
            columnName: 'To Do',
            tasks: []
          }
        ],
        permissions: [
          {
            identifier: DiscordPermission.ADMINISTRATOR,
            kanbanPermission: [KanbanPermission.ADMINISTRATOR]
          }
        ]
      };

      // Call API
      const result = await createBoard(boardData);

      if (result.success && result.data) {
        // Update boards list
        setBoards(prev => [...prev, result.data]);
        
        // Show success message
        setSuccessMessage('Board created successfully!');
        
        // Reset form
        setFormState({
          boardName: '',
          description: '',
          touched: {
            boardName: false,
            description: false,
          }
        });
        
        // Close modal after delay
        setTimeout(() => {
          setIsCreating(false);
          setSuccessMessage('');
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to create board');
      }
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to create board'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Success Message Toast */}
      {successMessage && (
        <div className={styles.successToast} onClick={() => setSuccessMessage('')}>
          {successMessage}
        </div>
      )}

      {/* Header */}
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

      {/* Boards List */}
      <div className={styles.boardsList}>
        {boards.map((board) => (
          <div key={board.boardId} className={styles.boardCard}>
            <h3 className={styles.boardTitle}>{board.boardName}</h3>
            <p className={styles.boardInfo}>
              {board.columns.length} {board.columns.length === 1 ? 'column' : 'columns'}
            </p>
            {board.description && (
              <p className={styles.boardDescription}>{board.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Create Board Modal */}
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