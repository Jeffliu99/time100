import type { Project } from "@/types";

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load projects");
  return response.json();
}

export async function updateProject(
  id: string,
  data: {
    status?: string;
    progress?: number;
  }
) {
  const response = await fetch(
    `/api/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update project"
    );
  }

  return response.json();
}