import type { Metadata } from "next";
import AboutLanding from "@/components/about/AboutLanding";

export const metadata: Metadata = {
  title: "About Time100",
  description: "Learn why Time100 connects goals, projects, tasks, growth records, and a personal companion.",
};

export default function AboutPage() {
  return <AboutLanding />;
}
