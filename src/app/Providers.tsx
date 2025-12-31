"use client";

import { ReduxProvider } from "@/store/Providers";
import ThemeWrapper from "@/components/Common/ThemeWrapper";
import AuthBootstrap from "@/components/(global)/AuthBootstrap";
import ThemeCSSSync from "@/components/(global)/systemtheme/ThemeCSSSync";
import { Toaster } from "react-hot-toast";
import RouteTracker from "@/components/(global)/RouteTracker";
import { usePathname } from "next/navigation";
import Footer from "@/components/(landing-page)/Footer";
import ScrollToTop from "@/components/(global)/ScrollToTop";
import PrivateRoute from "@/components/(global)/private/PrivateRoute";
import MotivationalTracker from "@/components/crazy/MotivationalTracker";
import Header from "@/components/(landing-page)/Header";
import ResumeNavbar from "@/components/(landing-page)/Header/ResumeNavbar";

export function Providers({ children }) {
  const pathname = usePathname();

  // Routes WITHOUT layout
  const noLayoutRoutes = [
    "/problemlist",
    "/user-dashboard",
    "/user-dashboard/support",
    "/user-dashboard/downloads",
    "/user-dashboard/payments",
    "/user-dashboard/account",
    "/admin-view",
  ];

  const hideLayout = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Actual private routes you want
  const privateRoutes = ["/user-dashboard", "/admin-view"];

  const isPrivate = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const showResumeNavbar =
    pathname.startsWith("/resume/") && pathname !== "/resume";

  return (
    <ReduxProvider>
      <ThemeWrapper>
        <AuthBootstrap>
          <RouteTracker />

          {!hideLayout && !showResumeNavbar && <Header />}
          {showResumeNavbar && <ResumeNavbar />}

          {isPrivate ? <PrivateRoute>{children}</PrivateRoute> : children}

          <ThemeCSSSync />
          <MotivationalTracker />
          <Toaster
            position="bottom-right"
            toastOptions={{ duration: 3000 }}
            containerStyle={{ zIndex: 100000 }}
          />

          {!hideLayout && !showResumeNavbar && <Footer />}

          <ScrollToTop />
        </AuthBootstrap>
      </ThemeWrapper>
    </ReduxProvider>
  );
}
