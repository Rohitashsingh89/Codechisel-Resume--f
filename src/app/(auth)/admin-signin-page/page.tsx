"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import {
  setCredentials,
  setLoading,
  setLoginError,
} from "@/features/auth/authSlice";
import { setProfile } from "@/features/profile/profileSlice";
import { Eye, EyeOff } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  hasPassword: boolean;
}

export default function AdminSigninPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, user } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "Admin" || user.role === "SuperAdmin") {
        router.replace("/admin-view");
      } else {
        router.replace("/user-dashboard");
      }
    }
  }, [user, router]);

  const handleGoogleSignin = async () => {
    toast("Google sign-in button for dev purposes");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoginError(null));
    dispatch(setLoading(true));

    try {
      const res = await apiFetch<{
        accessToken: string;
        refreshTokenVal: string;
        user: UserType;
      }>("/v1/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...form, role: "Admin" }),
      });

      if (res.user.role !== "Admin" && res.user.role !== "SuperAdmin") {
        toast.error("Access denied. Only admins can login here.");
        dispatch(setLoading(false));
        return;
      }

      localStorage.setItem("accessToken", res.accessToken);

      dispatch(
        setCredentials({
          accessToken: res.accessToken,
          user: res.user,
          loading: false,
          loginError: "",
        }),
      );

      const profile = await apiFetch("/v1/users/me", {
        headers: { Authorization: `Bearer ${res.accessToken}` },
      });
      dispatch(setProfile(profile));

      toast.success("Login successful!");
      router.push("/admin-view");
    } catch (err: any) {
      let errorMessage = "Failed to sign in";
      try {
        const parsed = JSON.parse(err.message);
        errorMessage = parsed.message || errorMessage;
      } catch {
        errorMessage = err.message || errorMessage;
      }
      dispatch(setLoginError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                Admin Sign In
              </h3>
              <p className="text-body-color mb-11 text-center text-base font-medium">
                Only Admins or SuperAdmins can access.
              </p>

              <button
                onClick={handleGoogleSignin}
                className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary mb-6 flex w-full items-center justify-center rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none"
              >
                <span className="mr-3">
                  {/* SVG copied from normal signin */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_95:967)">
                      <path d="M20.0001 10.2216..." fill="#4285F4" />
                      <path d="M10.2042 20.0001..." fill="#34A853" />
                      <path d="M4.39911 11.9777..." fill="#FBBC05" />
                      <path d="M10.2042 3.86663..." fill="#EB4335" />
                    </g>
                    <defs>
                      <clipPath id="clip0_95:967">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Sign in with Google
              </button>

              <div className="mb-8 flex items-center justify-center">
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[70px] sm:block"></span>
                <p className="text-body-color w-full px-5 text-center text-base font-medium">
                  Or, sign in with your email
                </p>
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[70px] sm:block"></span>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-8">
                  <label className="text-dark mb-3 block text-sm dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Enter your Email"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    required
                  />
                </div>

                <div className="relative mb-8">
                  <label className="text-dark mb-3 block text-sm dark:text-white">
                    Your Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Enter your Password"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-12 right-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <label className="text-body-color flex cursor-pointer items-center text-sm font-medium select-none">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="box border-body-color/20 mr-4 flex h-5 w-5 items-center justify-center rounded-sm border dark:border-white/10">
                          <span className="opacity-0">✔</span>
                        </div>
                      </div>
                      Keep me signed in
                    </label>
                  </div>
                  <div>
                    <a
                      href="/forgot-password"
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    disabled={loading}
                    className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-xs px-9 py-4 text-base font-medium text-white duration-300"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
              <div>
                  <Link
                    href="/signin"
                    className="text-primary mt-4 flex items-center justify-center hover:underline"
                  >
                    User Login
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG background */}
      <div className="absolute top-0 left-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary)" />
              <stop
                offset="1"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary)" />
              <stop
                offset="1"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
