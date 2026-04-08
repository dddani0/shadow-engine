import { Action, Scene, Sprite, Choice, Project, Timeline } from './../../api/api-types';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';

/*

 */

@Component({
  selector: 'app-project-page',
  imports: [RouterLink],
  templateUrl: './project-page.html',
})
export class ProjectPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  //Current project
  readonly projectId = signal<string>('');
  readonly project = signal<Project | null>(null);
  //Current scene
  readonly scenes = signal<Scene[]>([]);
  //The starting scene in the project (always the first scene in case of new project)
  readonly startSceneId = signal<string>('');
  //??
  readonly sceneChoice = signal<Record<string, Choice[]>>({});

  //The id of the currently active scene.
  readonly activeSceneId = signal<string>('');
  //Active scene.
  readonly activeScene = signal<Scene | null>(null);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // New scene form
  readonly newSceneTitle = signal('');
  readonly newSceneOrderIndex = signal(0);

  //new component form
  readonly newComponentTitle = signal('');

  // New choice form
  readonly choiceFromSceneId = signal<string>('');
  readonly choiceToSceneId = signal<string>('');
  readonly choiceLabel = signal<string>('');
  readonly choiceOrderIndex = signal<number>(0);

  readonly canCreateScene = computed(() => !this.loading());
  readonly canCreateChoice = computed(
    () =>
      this.choiceFromSceneId().length > 0 &&
      this.choiceToSceneId().length > 0 &&
      this.choiceLabel().trim().length > 0 &&
      !this.loading(),
  );

  constructor() {
    //Set id from route's current version.
    const id = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(id);
    this.refresh();
    this.setStartSceneId();
    this.newSceneTitle.set(`$New scene(${this.scenes.length})`);
  }

  onTextInput(event: Event): string {
    return (
      (event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? ''
    ).toString();
  }

  onNumberInput(event: Event): number {
    const raw = (event.target as HTMLInputElement | null)?.value ?? '0';
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  onSelect(event: Event): string {
    return ((event.target as HTMLSelectElement | null)?.value ?? '').toString();
  }

  getChoices(sceneId: string): Choice[] {
    return this.sceneChoice()[sceneId] ?? [];
  }

  setStartSceneId() {
    const projectId = this.projectId();
    this.api.getProject(projectId).subscribe({
      next: (project) => {
        if (!project.startSceneId) {
          console.log('set initial scene');
          //Set the starting scene id attribute
          this.startSceneId.set(project.scenes[0].id);
          console.log(this.startSceneId());
          //Set the active scene's id
          this.activeSceneId.set(project.scenes[0].id);
          console.log(this.activeSceneId());
          //Set the active scene
          this.activeScene.set(project.scenes.find((s) => s.id === this.activeSceneId())!);
          console.log(this.activeScene());
          //Update the project's data in the database according to the change
          this.api
            .updateProject(projectId, {
              startSceneId: this.startSceneId()!,
            })
            .subscribe({
              next: (p) => {
                console.log(p);
              },
            });
        }
      },
    });
  }

  SceneActionSetup() {
    this.newSceneTitle.set(`$New scene(${this.scenes.length})`);
    this.newSceneOrderIndex.set(this.newSceneOrderIndex() + 1);
  }

  refresh() {
    const projectId = this.projectId();
    this.loading.set(true);
    this.error.set(null);
    //Fetch new project.
    this.api.getProject(projectId).subscribe({
      next: (project) => {
        this.project.set(project);
      },
      error: (err) => {
        this.error.set(this.formatError(err));
        this.loading.set(false);
      },
    });
    //get scenes
    this.api.listScenes(projectId).subscribe({
      next: (sceneList) => {
        this.scenes.set(sceneList);
        // this.api.getTimeline(this.activeScene()?.timeline.id!).subscribe({
        //   next: (timeline) => {
        //     const scene = this.activeScene();
        //     if (scene) {
        //       scene.timeline = timeline;
        //     }
        //   },
        // });
      },
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
    //Update active scene timeline
  }

  createScene() {
    if (!this.canCreateScene()) return;
    this.loading.set(true);
    this.api
      .createScene({
        projectId: this.projectId(),
        title: this.newSceneTitle().trim(),
        orderIndex: Number(this.newSceneOrderIndex()),
      })
      .subscribe({
        next: () => {
          this.SceneActionSetup();
          this.refresh();
        },
        error: (e) => {
          this.error.set(this.formatError(e));
          this.loading.set(false);
        },
      });
  }

  createComponent() {
    const activeSceneId = this.activeScene()?.id;
    if (!activeSceneId) return;

    this.api
      .createComponent({
        sceneId: activeSceneId,
        title: this.newComponentTitle(),
      })
      .subscribe({
        next: () => this.refresh(),
        error: (e) => {
          this.error.set(this.formatError(e));
          this.loading.set(false);
        },
      });
  }

  updateTimeline() {
    const activeSceneId = this.activeScene()?.id;
    if (!activeSceneId || !this.activeScene()) return;
    this.api.getTimeline(activeSceneId).subscribe({
      next: (timeline) => {
        const scene = this.activeScene();
        if (scene) {
          scene.timeline = timeline;
        }
      },
    });
  }

  createAction(type: string) {
    switch (type) {
      case 'EnableSprite':
        console.log('clicked');
        //First, we create the sprite, then the component.
        this.api.createSprite({ path: 'Path' }).subscribe({
          next: (sprite) => {
            if (this.activeScene()?.timeline) {
              this.api
                .createAction({
                  type: type,
                  timelineId: this.activeScene()?.timeline.id!,
                  spriteId: sprite.id,
                })
                .subscribe({
                  next: () => {
                    this.refresh();
                  },
                  error: (e) => {
                    this.error.set(this.formatError(e));
                    this.loading.set(false);
                  },
                });
            }
          },
          error: (e) => {
            this.error.set(this.formatError(e));
            this.loading.set(false);
          },
        });
        break;
    }
  }

  deleteScene(sceneId: string) {
    if (!confirm('Delete this scene?')) return;
    this.loading.set(true);
    this.api.deleteScene(sceneId).subscribe({
      next: () => this.refresh(),
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
    });
  }

  createChoice() {
    if (!this.canCreateChoice()) return;
    this.loading.set(true);
    this.api
      .createChoice({
        fromSceneId: this.choiceFromSceneId(),
        toSceneId: this.choiceToSceneId(),
        label: this.choiceLabel().trim(),
        orderIndex: Number(this.choiceOrderIndex() ?? 0),
      })
      .subscribe({
        next: () => {
          this.choiceLabel.set('');
          this.choiceOrderIndex.set(0);
          this.refresh();
        },
        error: (e) => {
          this.error.set(this.formatError(e));
          this.loading.set(false);
        },
      });
  }

  deleteChoice(choiceId: string) {
    if (!confirm('Delete this choice?')) return;
    this.loading.set(true);
    this.api.deleteChoice(choiceId).subscribe({
      next: () => this.refresh(),
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
    });
  }

  changeScene(target: Event) {
    const targetId = (target.currentTarget as HTMLElement).id;
    this.activeScene.set(this.scenes().find((s) => s.id === targetId) ?? null);
  }

  private formatError(e: unknown) {
    const maybe = e as { message?: string; error?: unknown; status?: number };
    return `API error${maybe?.status ? ` (${maybe.status})` : ''}: ${maybe?.message ?? 'Unknown'}`;
  }
}
