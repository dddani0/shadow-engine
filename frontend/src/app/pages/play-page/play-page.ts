import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import {
  Action,
  Component as Comp,
  PlaybackResponse,
  Project,
  Scene,
  Sprite,
  Textbox,
  Timeline,
} from '../../api/api-types';
import { delay } from 'rxjs';

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
  readonly enabledSprites = signal<Sprite[]>([]);
  readonly textBox = signal<Textbox | null>(null);
  //
  readonly textBoxOutputStarted = signal<boolean>(false);
  readonly textBoxOutput = signal<string>('');
  readonly textBoxCPS = signal<number>(0);
  readonly textBoxContentIndex = signal<number>(0);
  readonly textBoxContentCount = signal<number>(0);
  readonly textBoxContent = signal<string[]>([]);
  readonly textBoxTitle = signal<string>('');

  readonly payload = signal<PlaybackResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  maximumNumberOfSprites: number = 3;

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
        this.actionIndex.set(-1);
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
      this.api.getComponent(this.currentAction()?.componentId!).subscribe({
        next: (c) => {
          this.currentComponent.set(c);
          if (this.currentComponent()?.sprite != null) {
            // this.enabledSprites.set(
            //   this.enabledSprites().concat([this.currentComponent()!.sprite]),
            // );
          } else if (this.currentComponent()?.textBox != null) {
            this.textBox.set(c.textBox!);
            this.textBoxCPS.set(c.textBox!.charPerSecond);
            this.textBoxOutputStarted.set(true);
            this.textBoxOutput.set('');
            this.textBoxTitle.set(c.textBox?.title ?? '');
            this.textBoxContentIndex.set(0);
            this.textBoxContent.set(c.textBox?.content!);
            this.textBoxContentCount.set(c.textBox?.content.length!);
            this.textBoxOutputStarted.set(true);
            this.initiateTextBox();
          }
        },
      });
    }

    if (this.currentAction()?.type === 'LoadScene') {
      //Load next scene
    }
  }

  initiateTextBox() {
    this.textBoxOutputStarted.set(true);
    let idx = 0;
    let interval = setInterval(() => {
      if (idx < this.textBoxContent()[this.textBoxContentIndex()].length) {
        this.textBoxOutput.set(
          this.textBoxOutput() + this.textBoxContent()[this.textBoxContentIndex()][idx],
        );
        idx++;
      } else {
        this.textBoxOutputStarted.set(false);
        clearInterval(interval);
      }
    }, 6000 / this.textBoxCPS());
  }

  progressTextbox(textBox: Textbox) {
    if (this.textBoxOutputStarted()) {
      this.textBoxOutput.set(this.textBoxContent()[this.textBoxContentIndex()]);
      this.textBoxOutputStarted.set(false);
    } else {
      if (this.textBoxContentIndex() < this.textBoxContentCount() - 1) {
        this.textBoxContentIndex.set(this.textBoxContentIndex() + 1);
        this.textBoxOutput.set('');
        this.textBoxOutputStarted.set(true);
        this.initiateTextBox();
      } else {
        this.textBox.set(null);
        this.textBoxCPS.set(0);
        this.textBoxOutput.set('');
        this.textBoxTitle.set('');
        this.textBoxContentIndex.set(0);
        this.textBoxContent.set([]);
        this.textBoxContentCount.set(0);
        this.textBoxOutputStarted.set(false);
        this.stepTimeline();
      }
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
