export interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Scene {
  id: string;
  projectId: string;
  title: string | null;
  content: string;
  orderIndex: number;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface Choice {
  id: string;
  fromSceneId: string;
  toSceneId: string;
  label: string;
  orderIndex: number;
}

export interface PlaybackChoice {
  id: string;
  label: string;
  toSceneId: string;
}

export interface PlaybackResponse {
  scene: {
    id: string;
    title: string | null;
    content: string;
    metadata: unknown | null;
    orderIndex: number;
  } | null;
  choices: PlaybackChoice[];
}

