import React from "react";
import ProfileOverview from "@/components/users/ProfileOverview";
import Header from "@/components/header";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Header />
      <ProfileOverview />
    </div>
  );
};

export default ProfilePage;
