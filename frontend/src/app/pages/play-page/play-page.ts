import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import {
  Action,
  Component as Comp,
  PlaybackResponse,
  Project,
  Scene,
  Timeline,
} from '../../api/api-types';

@Component({
  selector: 'app-play-page',
  imports: [RouterLink],
  templateUrl: './play-page.html',
})
export class PlayPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  readonly projectId = signal<string>('');
  readonly project = signal<Project | null>(null);
  //
  readonly projectName = signal<string>('');
  //
  readonly initialSceneId = signal<string>('');
  readonly initialScene = signal<Scene | null>(null);
  readonly currentSceneId = signal<string>('');
  readonly currentScene = signal<Scene | null>(null);
  readonly scenes = signal<Scene[]>([]);
  //
  readonly currentTimeline = signal<Timeline | null>(null);
  //
  readonly actionIndex = signal<number>(-1);
  readonly currentAction = signal<Action | null>(null);
  readonly currentComponent = signal<Comp | null>(null);

  readonly payload = signal<PlaybackResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    const projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(projectId);
    //
    this.api.getProject(projectId).subscribe({
      next: (p) => {
        this.project.set(p);
        this.projectName.set(p.title);
        //
        this.api.listScenes(this.projectId()).subscribe({
          next: (s) => {
            this.scenes.set(s);
          },
        });
        //
        this.api.getScene(p.startSceneId).subscribe({
          next: (s) => {
            this.initialSceneId.set(s.id);
            this.initialScene.set(s);
            this.load(this.initialScene()?.id!);
          },
        });
      },
    });

    this.api.getPlayback(this.projectId()).subscribe({
      next: (p) => {
        this.payload.set(p);
      },
    });
  }

  load(sceneId: string) {
    this.loading.set(true);
    this.error.set(null);
    //
    this.currentSceneId.set(sceneId);
    this.api.getScene(this.currentSceneId()).subscribe({
      next: (s) => {
        this.currentSceneId.set(s.id);
        this.currentScene.set(s);
        this.currentTimeline.set(s.timeline);
        //
        this.actionIndex.set(0);
        this.stepTimeline();
      },
      error: (err) => this.error.set(this.formatError(err)),
      complete: () => this.loading.set(false),
    });
  }

  stepTimeline() {
    if (this.currentTimeline() == null) return;
    if (this.currentTimeline()?.actions.length == 0) return;
    this.actionIndex.set(this.actionIndex() + 1);
    this.currentAction.set(this.currentTimeline()?.actions[this.actionIndex()]!);
    if (this.currentAction()?.componentId !== null) {
      console.log(this.currentAction()?.type);
      this.api.getComponent(this.currentAction()?.componentId!).subscribe({
        next: (c) => {
          this.currentComponent.set(c);
        },
      });
    }

    if (this.currentAction()?.type === 'LoadScene') {
      //Load next scene
    }
  }

  restart() {
    this.currentSceneId.set(this.initialSceneId());
    this.load(this.currentSceneId());
  }

  private formatError(e: unknown) {
    const maybe = e as { message?: string; error?: unknown; status?: number };
    return `API error${maybe?.status ? ` (${maybe.status})` : ''}: ${maybe?.message ?? 'Unknown'}`;
  }
}
