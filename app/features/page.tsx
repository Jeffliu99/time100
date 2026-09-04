import type { Metadata } from "next";
import FeaturesLanding from "@/components/features/FeaturesLanding";

export const metadata: Metadata = {
  title: "Features | Time100 Growth Operating System",
  description:
    "Explore Time100 features for goal tracking, project and task management, growth timelines, milestones, reflection, and a personal growth companion.",
  keywords: [
    "personal growth app",
    "goal tracking software",
    "growth tracking system",
    "project and task management",
    "personal development tool",
  ],
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Time100 Features",
    description:
      "Connect goals, projects, tasks, growth records, a Timeline, and a personal companion in one system.",
    type: "website",
  },
};

export default function FeaturesPage() {
  return <FeaturesLanding />;
}
