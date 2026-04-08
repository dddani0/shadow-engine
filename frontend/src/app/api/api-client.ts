import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action, Choice, Component, PlaybackResponse, Project, Scene, Sprite, Timeline } from './api-types';

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

  createAction(body: { type: string; timelineId: string; spriteId?: string }): Observable<Action> {
    return this.http.post<Action>(`${this.baseUrl}/actions`, body);
  }

  updateProject(
    id: string,
    body: { title?: string; description?: string | null, startSceneId?: string },
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

  getScene(id: string): Observable<Scene & { choicesFrom?: Choice[] }> {
    return this.http.get<Scene & { choicesFrom?: Choice[] }>(`${this.baseUrl}/scenes/${id}`);
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
    spriteId?: string;
    textBoxId?: string;
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

  updateTimeline(
    id: string,
    body: { actions?: Action[] },
  ): Observable<Timeline> {
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
    body: { type?: string; spriteId?: string },
  ): Observable<Action> {
    return this.http.patch<Action>(`${this.baseUrl}/actions/${id}`, body);
  }

  deleteAction(id: string): Observable<Action> {
    return this.http.delete<Action>(`${this.baseUrl}/actions/${id}`);
  }

  // Sprites
  listSprites(): Observable<Sprite[]> {
    return this.http.get<Sprite[]>(`${this.baseUrl}/components`);
  }

  getSprite(id: string): Observable<Sprite> {
    return this.http.get<Sprite>(`${this.baseUrl}/components/${id}`);
  }

  createSprite(body: { path: string }): Observable<Sprite> {
    return this.http.post<Sprite>(`${this.baseUrl}/components`, body);
  }

  updateSprite(
    id: string,
    body: { path?: string },
  ): Observable<Sprite> {
    return this.http.patch<Sprite>(`${this.baseUrl}/components/${id}`, body);
  }

  deleteSprite(id: string): Observable<Sprite> {
    return this.http.delete<Sprite>(`${this.baseUrl}/components/${id}`);
  }
}
