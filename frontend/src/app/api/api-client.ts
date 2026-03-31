import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action, Choice, PlaybackResponse, Project, Scene, Timeline } from './api-types';

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

  updateProject(
    id: string,
    body: { title?: string; description?: string | null },
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
    content: string;
    orderIndex?: number;
    metadata?: Record<string, unknown>;
    Timeline: {
      actions: Action[];
    };
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
}
