import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchProfile, updateProfile } from "../../services/ProfileService";
import BackButton from "../../components/common/BackButton";
import DefaultAvatorWhite from "../../icons/DefaultAvatorWhite.svg";
import EditProfileIcon from "../../icons/ProfileUpdate/EditProfile.svg";

export default function EditProfilePage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nickname: "",
    bio: "",
    gender: "",
    country: "",
    city: "",
    avatar: "",
    userId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(formData);
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        {t("editProfilePage.loading", "Loading...")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      {/* Header with Back Button and Title */}
      <div className="relative w-full max-w-[480px] flex items-center justify-center py-4 bg-transparent">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold text-center w-full">
          Edit Profile
        </h1>
      </div>
      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-2 mb-4">
        <div className="relative">
          <img
            src={formData.avatar || DefaultAvatorWhite}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer border border-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <img
              src={EditProfileIcon}
              alt="Upload"
              className="w-6 h-6 text-blue-500"
            />
          </label>
        </div>
      </div>
      {/* Edit Form */}
      <form className="w-full max-w-[480px] mx-auto p-4" onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Profile Name</label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => handleInputChange("nickname", e.target.value)}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="text"
            value={formData.userId}
            readOnly
            className="w-full bg-gray-100 text-gray-400 px-4 py-3 rounded-lg cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B] min-h-[80px] resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Gender</label>
          <input
            type="text"
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 bg-yellow-gradient text-black"
        >
          Save
        </button>
        {error && <div className="text-red-500 text-center py-2">{error}</div>}
        {success && (
          <div className="text-green-600 text-center py-2">{success}</div>
        )}
      </form>
    </div>
  );
}
