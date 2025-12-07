"use client";

import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { fetchProfile, updateProfile } from "@/features/profile/profileSlice";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hook/useLogout";
import { Eye, EyeOff, UserPen } from "lucide-react";
import PrimaryButton from "@/components/Common/ui/PrimaryButton";

export default function AccountDetailsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { logout } = useLogout();

  const { profile, loading, saving, error } = useAppSelector(
    (state) => state.profile,
  );

  // Form states (local only)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputBase =
    "w-full border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded-sm";

  // ✅ ALWAYS FETCH ON MOUNT (even if profile exists)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchProfile(token));
    } else {
      router.push("/signin");
    }
  }, [dispatch, router]);

  // ✅ SYNC FORM WHEN PROFILE LOADS
  useEffect(() => {
    if (profile && !loading) {
      const first = profile.fullName?.split(" ")[0] || "";
      const last = profile.fullName?.split(" ").slice(1).join(" ") || "";

      setFormData({
        firstName: first,
        lastName: last,
        displayName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, loading]);

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    dispatch(
      updateProfile({
        data: {
          fullName,
          phoneNumber: formData.phoneNumber || "",
          bio: formData.bio || "",
        },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        let msg = "Failed to update profile";

        // your error might be a JSON string — so parse it safely
        try {
          const parsed = JSON.parse(err);
          msg = parsed.message || msg;
        } catch {
          msg = err || msg;
        }

        toast.error(msg);
      });
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (!passwordForm.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    const [loadingToast] = toast.loading("Changing password...");
    try {
      await apiFetch("/v1/auth/change-password", {
        method: "PUT",
        body: JSON.stringify({
          oldPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      toast.dismiss(loadingToast);
      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to change password");
    }
  };

  // ✅ FIXED: Show loading spinner while fetching (NOT "No profile found")
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="p-8 text-center">
            <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Loading your profile...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ✅ Show error with retry (NOT "No profile found")
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-xl dark:bg-gray-900">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Profile Load Failed
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">{error}</p>
            <div className="space-x-3">
              <button
                onClick={() => {
                  const token = localStorage.getItem("accessToken");
                  if (!token) {
                    toast.error("Session expired, please login again");
                    router.push("/signin");
                    return;
                  }
                  dispatch(fetchProfile(token));
                }}
                className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2 font-medium text-white transition-all"
              >
                Retry
              </button>
              <button
                onClick={() => logout("user")}
                className="rounded-lg bg-gray-500 px-6 py-2 font-medium text-white transition-all hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        {/* Page Header */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
              <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
              <div className="xs:flex block items-center gap-3">
                <UserPen className="xs:mb-0 mb-1 h-10 w-10 text-primary dark:text-primary/80" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                    Account Details
                  </h1>
                  <p className="text-slate-800 dark:text-gray-300">
                    Track all your account information and change your password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 mb-10 max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="rounded-xl bg-white p-6 dark:bg-gray-900">
              {/* ✅ COMBINED GRID: LEFT = ACCOUNT SETTINGS, RIGHT = CHANGE PASSWORD */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Left Column: Account Settings Form */}
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Account Settings
                  </h3>
                  <p className="border-b border-gray-300 pb-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    Update your account information
                  </p>

                  <div className="space-y-4">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className={inputBase}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className={inputBase}
                      />
                    </div>

                    {/* Display Name */}
                    <div>
                      <label
                        htmlFor="displayName"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Display Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            displayName: e.target.value,
                          })
                        }
                        className={
                          inputBase +
                          " cursor-not-allowed italic dark:text-gray-500"
                        }
                      />
                      <span className="text-sm text-gray-500 italic dark:text-gray-400">
                        How your name will appear in your account and reviews
                      </span>
                    </div>

                    {/* Email (readonly) */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        className={`${inputBase} cursor-not-allowed bg-gray-100 italic dark:text-gray-500`}
                        readOnly
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className={inputBase}
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label
                        htmlFor="bio"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        className={`${inputBase} resize-vertical`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  <PrimaryButton
                    type="submit"
                    loading={saving}
                    fullWidth
                    loadingText="Saving Profile..."
                  >
                    Save Profile Changes
                  </PrimaryButton>
                </form>

                {/* Right Column: Change Password Form */}
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Change Password
                  </h3>
                  <p className="border-b border-gray-300 pb-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    Update your account password
                  </p>

                  <div className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                      <label
                        htmlFor="currentPassword"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value,
                          })
                        }
                        placeholder="Current Password..."
                        required
                        className={inputBase}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute top-9 right-3 text-sm text-gray-500"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                      <label
                        htmlFor="newPassword"
                        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="New Password..."
                        required
                        minLength={6}
                        className={inputBase}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute top-9 right-3 text-sm text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-1 block text-sm font-medium text-gray-500"
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm New Password..."
                        required
                        className={inputBase}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute top-9 right-3 text-sm text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* <button
                    type="submit"
                    disabled={
                      loading ||
                      passwordForm.newPassword !== passwordForm.confirmPassword
                    }
                    className="w-full rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Changing Password..." : "Change Password"}
                  </button> */}
                  <PrimaryButton
                    type="submit"
                    loading={loading}
                    fullWidth
                    disabled={
                      passwordForm.newPassword !== passwordForm.confirmPassword
                    }
                    loadingText="Changing Password..."
                  >
                    Change Password
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
