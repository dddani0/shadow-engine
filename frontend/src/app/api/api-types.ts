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
  title: string;
  components: Component[];
  orderIndex: number;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  timeline: Timeline;
}

export interface Choice {
  id: string;
  actionId: string;
  action: Action;
  choiceMenu?: ChoiceMenu;
  choiceMenuId?: string;
  label: string;
  orderIndex: number;
}

export interface ChoiceMenu {
  id: string;
  title?: string;
  description?: string;
  component?: Component;
  componentId?: string;
  choices: Choice[];
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
  title?: string;
  content: string[];
  charPerSecond: number;
}

export interface Component {
  id: string;
  sceneId: String;
  title: String;
  sprite?: Sprite;
  textBox?: Textbox;
  choiceMenu?: ChoiceMenu;
}

export interface Action {
  id: string;
  type: string;
  timelineId: string;
  componentId?: string;
  variables: Variable[];
  loadSceneId?: string;
}

export interface Variable {
  id: string;
  projectId: string;
  project: Project;
  name: string;
  value: string;
}
