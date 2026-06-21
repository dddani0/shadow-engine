import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Action,
  Choice,
  Component,
  PlaybackResponse,
  Project,
  Scene,
  Sprite,
  Textbox,
  Timeline,
  ChoiceMenu,
} from './api-types';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  // Get all projects
  listProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }

  // Get only recent projects
  listRecentProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }

  getProject(id: string): Observable<Project & { scenes?: Scene[] }> {
    return this.http.get<Project & { scenes?: Scene[] }>(`${this.baseUrl}/projects/${id}`);
  }

  createProject(body: { title: string; description?: string }): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, body);
  }

  createAction(body: {
    type: string;
    timelineId: string;
    componentId?: string;
    variables: [];
    loadSceneId?: string;
  }): Observable<Action> {
    return this.http.post<Action>(`${this.baseUrl}/actions`, body);
  }

  updateProject(
    id: string,
    body: { title?: string; description?: string | null; startSceneId?: string },
  ): Observable<Project> {
    return this.http.patch<Project>(`${this.baseUrl}/projects/${id}`, body);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.baseUrl}/projects/${id}`);
  }

  // Scenes
  listScenes(projectId: string): Observable<Scene[]> {
    return this.http.get<Scene[]>(`${this.baseUrl}/scenes`, {
      params: { projectId },
    });
  }

  getScene(id: string): Observable<Scene> {
    return this.http.get<Scene>(`${this.baseUrl}/scenes/${id}`);
  }

  createScene(body: {
    projectId: string;
    title?: string;
    orderIndex?: number;
    metadata?: Record<string, unknown>;
  }): Observable<Scene> {
    return this.http.post<Scene>(`${this.baseUrl}/scenes`, body);
  }

  updateScene(
    id: string,
    body: {
      title?: string | null;
      content?: string;
      orderIndex?: number;
      metadata?: Record<string, unknown> | null;
      Timeline?: Timeline;
    },
  ): Observable<Scene> {
    return this.http.patch<Scene>(`${this.baseUrl}/scenes/${id}`, body);
  }

  deleteScene(id: string): Observable<Scene> {
    return this.http.delete<Scene>(`${this.baseUrl}/scenes/${id}`);
  }

  // Choices
  listChoices(sceneId: string): Observable<(Choice & { toScene?: Partial<Scene> })[]> {
    return this.http.get<(Choice & { toScene?: Partial<Scene> })[]>(`${this.baseUrl}/choices`, {
      params: { sceneId },
    });
  }

  createChoice(body: {
    fromSceneId: string;
    toSceneId: string;
    label: string;
    orderIndex?: number;
  }): Observable<Choice> {
    return this.http.post<Choice>(`${this.baseUrl}/choices`, body);
  }

  updateChoice(
    id: string,
    body: { toSceneId?: string; label?: string; orderIndex?: number },
  ): Observable<Choice> {
    return this.http.patch<Choice>(`${this.baseUrl}/choices/${id}`, body);
  }

  deleteChoice(id: string): Observable<Choice> {
    return this.http.delete<Choice>(`${this.baseUrl}/choices/${id}`);
  }

  createChoiceMenu(body: {
    title?: string;
    description?: string;
    componentId?: string;
    choices?: Choice[];
  }) {
    return this.http.post<ChoiceMenu>(`${this.baseUrl}/choiceMenu`, body);
  }

  updateChoiceMenu(
    id: string,
    body: {
      title?: string;
      description?: string;
      componentId?: string;
      choices?: Choice[];
    },
  ) {
    return this.http.patch<ChoiceMenu>(`${this.baseUrl}/choiceMenu/${id}`, body);
  }

  // Playback
  getPlayback(projectId: string, sceneId?: string): Observable<PlaybackResponse> {
    const params: Record<string, string> = {};
    if (sceneId) params['sceneId'] = sceneId;
    return this.http.get<PlaybackResponse>(`${this.baseUrl}/playback/${projectId}`, {
      params,
    });
  }

  // Components
  listComponents(sceneId: string): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.baseUrl}/components`, {
      params: { sceneId },
    });
  }

  getComponent(id: string): Observable<Component> {
    return this.http.get<Component>(`${this.baseUrl}/components/${id}`);
  }

  createComponent(body: {
    sceneId: string;
    title: string;
    sprite?: Sprite;
    textbox?: Textbox;
    choiceMenu?: ChoiceMenu;
  }): Observable<Component> {
    return this.http.post<Component>(`${this.baseUrl}/components`, body);
  }

  updateComponent(
    id: string,
    body: { title?: string; spriteId?: string; textBoxId?: string },
  ): Observable<Component> {
    return this.http.patch<Component>(`${this.baseUrl}/components/${id}`, body);
  }

  deleteComponent(id: string): Observable<Component> {
    return this.http.delete<Component>(`${this.baseUrl}/components/${id}`);
  }

  // Timelines
  getTimeline(id: string): Observable<Timeline> {
    return this.http.get<Timeline>(`${this.baseUrl}/timelines/${id}`);
  }

  createTimeline(body: { actions?: Action[] }): Observable<Timeline> {
    return this.http.post<Timeline>(`${this.baseUrl}/timelines`, body);
  }

  updateTimeline(id: string, body: { actions?: Action[] }): Observable<Timeline> {
    return this.http.patch<Timeline>(`${this.baseUrl}/timelines/${id}`, body);
  }

  deleteTimeline(id: string): Observable<Timeline> {
    return this.http.delete<Timeline>(`${this.baseUrl}/timelines/${id}`);
  }

  // Actions
  getAction(id: string): Observable<Action> {
    return this.http.get<Action>(`${this.baseUrl}/actions/${id}`);
  }

  updateAction(
    id: string,
    body: { type?: string; spriteId?: string; loadSceneId?: string },
  ): Observable<Action> {
    return this.http.patch<Action>(`${this.baseUrl}/actions/${id}`, body);
  }

  deleteAction(id: string): Observable<Action> {
    return this.http.delete<Action>(`${this.baseUrl}/actions/${id}`);
  }

  // Sprites
  listSprites(): Observable<Sprite[]> {
    return this.http.get<Sprite[]>(`${this.baseUrl}/sprite`);
  }

  getSprite(id: string): Observable<Sprite> {
    return this.http.get<Sprite>(`${this.baseUrl}/sprite/${id}`);
  }

  createSprite(body: { path: string }): Observable<Sprite> {
    return this.http.post<Sprite>(`${this.baseUrl}/sprite`, body);
  }

  updateSprite(id: string, body: { path?: string }): Observable<Sprite> {
    return this.http.patch<Sprite>(`${this.baseUrl}/sprite/${id}`, body);
  }

  deleteSprite(id: string): Observable<Sprite> {
    return this.http.delete<Sprite>(`${this.baseUrl}/sprite/${id}`);
  }

  // Textboxes
  listTextboxes(): Observable<Textbox[]> {
    return this.http.get<Textbox[]>(`${this.baseUrl}/textbox`);
  }

  getTextbox(id: string): Observable<Textbox> {
    return this.http.get<Textbox>(`${this.baseUrl}/textbox/${id}`);
  }

  createTextbox(body: {
    title?: string;
    content: string[];
    charPerSecond: number;
  }): Observable<Textbox> {
    return this.http.post<Textbox>(`${this.baseUrl}/textbox`, body);
  }

  updateTextbox(
    id: string,
    body: {
      title?: string;
      content?: string[];
      charPerSecond?: number;
      componentId?: string;
    },
  ): Observable<Textbox> {
    return this.http.patch<Textbox>(`${this.baseUrl}/textbox/${id}`, body);
  }

  deleteTextbox(id: string): Observable<Textbox> {
    return this.http.delete<Textbox>(`${this.baseUrl}/textbox/${id}`);
  }

  getTextboxByComponent(componentId: string): Observable<Textbox | null> {
    return this.http.get<Textbox | null>(`${this.baseUrl}/textbox/by-component`, {
      params: { componentId },
    });
  }
}
