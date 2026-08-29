export type CompanionMemoryDto = {
  id: string;
  title: string;
  content: string;
  type: string;
  importance: number;
  createdAt: string;
};

export type RecallResponse = {
  memory: CompanionMemoryDto | null;
  message: string | null;
};
