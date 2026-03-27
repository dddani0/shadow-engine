export interface Project {
  id: string;
  title: string;
  description: string | null;
  scenes: Scene[];
  createdAt: string;
  updatedAt: string;
}

export interface Scene {
  id: string;
  projectId: string;
  title: string | null;
  componentGroups: ObjectComponentGroup[];
  orderIndex: number;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  timeline: Timeline;
}

export interface Choice {
  id: string;
  fromSceneId: string;
  toSceneId: string;
  label: string;
  orderIndex: number;
}

export interface PlaybackResponse {
  scene: {
    id: string;
    title: string | null;
    content: string;
    metadata: unknown | null;
    orderIndex: number;
  } | null;
  choices: Choice[];
}

export interface Timeline {
  id: string;
  actions: Action[];
}

export interface Sprite {
  id: string;
  path: string;
}

export interface ObjectComponentGroup {
  id: string;
  objects: ObjectComponent[];
}

export interface ObjectComponent {
  id: string;
  title: String;
}

export interface Action {
  id: string;
}
