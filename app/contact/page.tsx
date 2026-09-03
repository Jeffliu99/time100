import type { Metadata } from "next";
import ContactLanding from "@/components/contact/ContactLanding";

export const metadata: Metadata = {
  title: "Contact Time100",
  description:
    "Contact Time100 for product support, feedback, feature suggestions, bug reports, and partnership inquiries.",
};

export default function ContactPage() {
  return <ContactLanding />;
}
