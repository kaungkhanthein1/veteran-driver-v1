import React from "react";
import BottomNavBar from "../components/common/BottomNavBar";
import ProfileCard from "../components/cards/ProfileCard";

export default function ProfilePage() {
  // TODO: Add logic for logged-in vs unlogged-in state
  // For now, always show logged-in ProfileCard
  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <ProfileCard />
        {/* In the future, render the unlogged-in profile card here if not logged in */}
        <BottomNavBar active="profile" />
      </div>
    </div>
  );
}
