import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/(landing-page)/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Code Chisel",
  description: "Reach out to Code Chisel for support, feedback, or collaboration opportunities.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Have a question, spotted a bug, or want to share feedback? Our team is here to help. Just drop us a message and we’ll get back to you shortly."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
