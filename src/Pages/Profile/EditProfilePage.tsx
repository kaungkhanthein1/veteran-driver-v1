import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchProfile, updateProfile } from "../../services/ProfileService";
import { useProfileEdit } from "../../context/ProfileEditContext";
import BackButton from "../../components/common/BackButton";
import DefaultAvatorWhite from "../../icons/DefaultAvatorWhite.svg";
import EditProfileIcon from "../../icons/ProfileUpdate/EditProfile.svg";
import NextIcon from "../../icons/Next.svg";
import {
  useGetUploadUrlMutation,
  useConfirmUploadMutation,
} from "../../Pages/services/ProfileApi";

const FieldRow: React.FC<{
  label: string;
  value: string;
  onClick?: () => void;
  clickable?: boolean;
  showArrow?: boolean;
  last?: boolean;
}> = ({ label, value, onClick, clickable, showArrow, last }) => (
  <div
    className={`flex items-center justify-between px-4 py-4 ${
      !last ? "border-b border-gray-100" : ""
    } ${clickable ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}`}
    onClick={clickable ? onClick : undefined}
  >
    <span className="text-gray-500 text-base">{label}</span>
    <span className="flex items-center gap-2">
      <span
        className={`text-right text-base ${
          value ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {value || ""}
      </span>
      {showArrow && <img src={NextIcon} alt="Next" className="w-4 h-4 ml-2" />}
    </span>
  </div>
);

const EditProfileContent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    profileData,
    setProfileData,
    updateField,
    setOriginalData,
    hasChanges,
    resetChanges,
  } = useProfileEdit();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [getUploadUrl] = useGetUploadUrlMutation();
  const [confirmUpload] = useConfirmUploadMutation();
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        setProfileData(res.data);
        setOriginalData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile");
        setLoading(false);
      });
  }, [setProfileData, setOriginalData]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(profileData);
      setSuccess("Profile updated successfully!");
      setOriginalData(profileData);
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ... (keep your existing useEffect and handleSave)

  const handleAvatarUpload = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      setUploadProgress(0);

      // 1. Get upload URL
      const uploadResponse = await getUploadUrl({
        type: "avatar",
        usage: "profile",
        mimeType: file.type,
      }).unwrap();

      if (!uploadResponse.data) {
        throw new Error("Failed to get upload URL");
      }

      const { key, uploadUrl, accessUrl } = uploadResponse.data;

      // 2. Upload to S3
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      xhr.setRequestHeader("Content-Type", file.type);

      // Progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error("S3 upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("S3 upload failed"));
        xhr.send(file);
      });

      await uploadPromise;

      // 3. Get image dimensions for confirmation
      const dimensions = await new Promise<{ width: number; height: number }>(
        (resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              width: img.width,
              height: img.height,
            });
          };
          img.src = URL.createObjectURL(file);
        }
      );

      // 4. Confirm upload with backend
      await confirmUpload({
        key,
        size: file.size,
        meta: {
          width: dimensions.width,
          height: dimensions.height,
          source: "upload",
        },
      }).unwrap();

      // 5. Update profile with new avatar URL
      updateField("avatar", accessUrl);
      setSuccess("Avatar updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to upload avatar");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    handleAvatarUpload(file);
  };

  // Helper for location string
  const locationString = [profileData.country, profileData.city]
    .filter(Boolean)
    .join(" , ");

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
        {/* <div className="relative">
          <img
            src={profileData.avatar || DefaultAvatorWhite}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer border border-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const newAvatar = reader.result as string;
                    updateField("avatar", newAvatar);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <img
              src={EditProfileIcon}
              alt="Upload"
              className="w-6 h-6 text-blue-500"
            />
          </label>
        </div> */}
        <div className="relative">
          <img
            src={profileData.avatar || DefaultAvatorWhite}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer border border-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={loading}
            />
            <img
              src={EditProfileIcon}
              alt="Upload"
              className="w-6 h-6 text-blue-500"
            />
          </label>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[480px] mx-auto p-4 space-y-4">
        {/* First Card: Profile Name, Username, Veteran ID */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Profile Name"
            value={profileData.nickname}
            clickable={true}
            showArrow={true}
            onClick={() => navigate("nickname")}
          />
          <FieldRow
            label="Username"
            value={profileData.username || ""}
            clickable={true}
            showArrow={true}
            onClick={() => navigate("username")}
          />
          <FieldRow
            label="Veteran ID"
            value={profileData.userId || ""}
            clickable={false}
            showArrow={false}
            last={true}
          />
        </div>

        {/* Second Card: Bio */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Bio"
            value={profileData.bio}
            clickable={true}
            showArrow={true}
            onClick={() => navigate("bio")}
            last={true}
          />
        </div>

        {/* Third Card: Gender, Location */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Gender"
            value={profileData.gender}
            clickable={true}
            showArrow={true}
            onClick={() => navigate("gender")}
          />
          <FieldRow
            label="Location"
            value={locationString}
            clickable={true}
            showArrow={true}
            onClick={() => navigate("country")}
            last={true}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full rounded-full py-3 text-lg font-semibold transition-colors duration-200 ${
            !saving
              ? "bg-yellow-gradient text-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {error && (
          <div className="text-red-500 text-center py-2 mt-2">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-center py-2 mt-2">{success}</div>
        )}
      </div>
    </div>
  );
};

export default EditProfileContent;
