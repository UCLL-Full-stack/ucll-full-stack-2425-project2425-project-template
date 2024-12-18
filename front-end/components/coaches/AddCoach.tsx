import React, { useState, useEffect } from "react";
import { Coach, Job } from "@/types"; // Adjust the import path if needed

interface AddCoachProps {
  onSave: (newCoach: Omit<Coach, "id"> & { teamId: number }) => void; // Excludes id
  onClose: () => void;
}

const AddCoach: React.FC<AddCoachProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState<{
    name: string;
    job: Job;
    imageUrl: string;
  }>({
    name: "",
    job: "Head Coach" as Job, 
    imageUrl: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoach = {
      ...formData,
      teamId: 1, // Hardcode Shitty's teamId 
    };
    onSave(newCoach);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">Add New Coach</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">Job:</label>
            <select
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="" disabled>
                Select Job
              </option>
              <option value="Head Coach">Head Coach</option>
              <option value="Assistant Coach">Assistant Coach</option>
              <option value="Goalkeeping Coach">Goalkeeping Coach</option>
              <option value="Fitness Coach">Fitness Coach</option>
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">Image URL (optional):</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 font-bold text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
            >
              Add Coach
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoach;
