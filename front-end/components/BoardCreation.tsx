import React, { useState } from 'react';

const BoardCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    boardName: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsCreating(false);
  };

  return (
    <div className="p-8">
      {/* Header with Title and New Board button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif">Kanban Boards</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-[#1867E3] text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <span className="mr-1 text-lg">+</span> New Board
        </button>
      </div>

      {/* Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
            <h2 className="text-xl font-serif mb-6">Create New Board</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2">
                  Board Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.boardName}
                  onChange={(e) => setFormData({ ...formData, boardName: e.target.value })}
                  placeholder="Enter board name"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter board description"
                  className="w-full px-3 py-2 border rounded"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1867E3] text-white px-4 py-2 rounded-md hover:bg-blue-700"
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