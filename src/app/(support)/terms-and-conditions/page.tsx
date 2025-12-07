import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Page | Code Chisel",
  description:
    "Code Chisel is an online platform to practice coding problems, prepare for tech interviews, and sharpen your problem-solving skills.",
};

const TermsOfServicePage = () => {
  return (
    <>
    <Breadcrumb
      pageName="Terms of Service"
      description="Please read these terms carefully before using our services."
    />
    <section className="container mx-auto px-4 py-16 md:py-20 lg:py-28">

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-md shadow-md">
        <h1 className="mb-6 text-4xl font-bold text-black dark:text-white text-gradient">
          Terms of Service
        </h1>

        <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Welcome to Code Chisel. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          By accessing or using our services, you agree to these Terms of Service and our Privacy Policy.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          2. Use of Services
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          You agree to use the services only for lawful purposes and in a way that does not infringe the rights of others.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          3. User Accounts
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Some services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          4. Intellectual Property
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          All content provided on this site is owned by Code Chisel or its licensors and is protected by copyright and other intellectual property laws.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          5. Limitation of Liability
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Code Chisel is not liable for any damages arising out of or in connection with your use of our services.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          6. Changes to Terms
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          We may update these terms at any time. Continued use of our services constitutes acceptance of the new terms.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold text-black dark:text-white">
          7. Contact Us
        </h2>
        <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          If you have any questions about these Terms, please contact us at <a href="mailto:support@codechisel.com" className="text-primary hover:underline">support@codechisel.com</a>.
        </p>

        <p className="mt-10 text-sm text-body-color dark:text-body-color-dark">
          Last updated: September 28, 2025
        </p>
      </div>
    </section>
    </>
  );
};

export default TermsOfServicePage;
