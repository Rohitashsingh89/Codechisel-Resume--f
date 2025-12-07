import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";

export default function ProfilePage() {
  return (
    <MainShell>
      <div className="space-y-6">
        {/* Page Header */}
        <Card className="border border-gray-300 bg-gray-200/60 dark:border-white/10 dark:bg-gray-800/60">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Profile
          </h1>
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            Manage your personal information and account settings.
          </p>
        </Card>

        {/* Profile Info */}
        <Card className="border border-gray-300 bg-gray-200/60 dark:border-white/10 dark:bg-gray-800/60">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <input
                type="text"
                defaultValue="Admin"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Joined On
              </label>
              <input
                disabled
                type="text"
                defaultValue="12 Jan 2024"
                className="mt-1 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-300/70 px-3 py-2 text-gray-600 opacity-80 shadow-sm dark:border-white/10 dark:bg-gray-700/30 dark:text-gray-400"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">
              Save Changes
            </button>
          </div>
        </Card>

        {/* Password Section */}
        <Card className="border border-gray-300 bg-gray-200/60 dark:border-white/10 dark:bg-gray-800/60">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Change Password
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 shadow-sm dark:border-white/10 dark:bg-gray-700/50 dark:text-gray-100"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button className="rounded-md bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400">
                Update Password
              </button>
            </div>
          </div>
        </Card>
      </div>
    </MainShell>
  );
}
