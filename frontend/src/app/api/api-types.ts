export interface Project {
  id: string;
  title: string;
  description: string | null;
  scenes: Scene[];
  createdAt: string;
  updatedAt: string;
  startSceneId: string;
}

export interface Scene {
  id: string;
  projectId: string;
  title: string | null;
  components: Component[];
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

export interface Textbox {
  id: string;
}

export interface Component {
  id: string;
  sceneId: String;
  title: String;
  sprite?: Sprite;
  textBox?: Textbox;
}

export interface Action {
  id: string;
  type: string;
  timelineId: string;
  spriteId?: string;
}
