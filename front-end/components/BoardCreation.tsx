'use client';

import React, { useState } from 'react';
import styles from '../styles/board.module.css';

const BoardCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    boardName: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setIsCreating(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Kanban Boards</h1>
        <button
          onClick={() => setIsCreating(true)}
          className={styles.button}
        >
          + New Board
        </button>
      </div>

      {/* Modal */}
      {isCreating && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Create New Board</h2>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Board Name <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.boardName}
                  onChange={(e) => setFormData({ ...formData, boardName: e.target.value })}
                  className={styles.input}
                  placeholder="Enter board name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={styles.textarea}
                  placeholder="Enter board description"
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.createButton}
                >
                  Create Board
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