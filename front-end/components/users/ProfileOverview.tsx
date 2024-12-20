import React, { useEffect, useState } from "react";
import UserService from "@/services/user/UserService";
import { Profile } from "@/types";

const ProfileOverview: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const parsedUser = loggedInUser ? JSON.parse(loggedInUser) : null;
        const id = parsedUser?.id;
        console.log(id);
        if (!id) {
          throw new Error("User id not found in session storage");
        }
        const response = await UserService.getUserById(id);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {profile ? (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Overview
          </h1>
          <div className="text-gray-600">
            <p className="mb-2">
              <strong className="font-medium text-gray-800">Bio:</strong>{" "}
              {profile.bio}
            </p>
            <p>
              <strong className="font-medium text-gray-800">User ID:</strong>{" "}
              {profile.userId}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>No profile data available</p>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
