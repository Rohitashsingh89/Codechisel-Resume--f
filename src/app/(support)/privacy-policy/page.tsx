import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Page | Code Chisel",
  description:
    "Code Chisel is an online platform to practice coding problems, prepare for tech interviews, and sharpen your problem-solving skills.",
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Privacy Policy"
        description="Understand how we collect, use, and protect your personal data."
      />
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-md bg-white p-8 shadow-md dark:bg-gray-900">
          <h1 className="mb-6 text-4xl font-bold text-black dark:text-white text-gradient">
            Privacy Policy
          </h1>

          <p className="text-body-color dark:text-body-color-dark mb-6 text-base leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            Information We Collect
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            We may collect personal information such as your name, email
            address, and other contact details when you subscribe to our
            newsletter or fill out forms on our website.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            How We Use Your Information
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            The information we collect is used to:
          </p>
          <ul className="text-body-color dark:text-body-color-dark mb-6 list-inside list-disc space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Send newsletters, updates, and promotional materials</li>
            <li>Respond to comments, questions, and support requests</li>
            <li>Improve our services and user experience</li>
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            Sharing Your Information
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            We do not sell, trade, or rent your personal information to others.
            We may share information with trusted third parties who assist us in
            operating our website and providing services, under strict
            confidentiality agreements.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            Our website uses cookies to enhance user experience and analyze
            website traffic. You can control cookies through your browser
            settings.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            Your Rights
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            You have the right to access, correct, or delete your personal
            information. For any privacy-related requests, please contact us at{" "}
            <a
              href="mailto:privacy@codechisel.com"
              className="text-primary hover:underline"
            >
              privacy@codechisel.com
            </a>
            .
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
            Changes to This Policy
          </h2>
          <p className="text-body-color dark:text-body-color-dark mb-4 text-base leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>

          <p className="text-body-color dark:text-body-color-dark mt-10 text-sm">
            Last updated: September 28, 2025
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
