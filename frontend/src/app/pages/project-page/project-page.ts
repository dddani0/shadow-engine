import {
  Action,
  Scene,
  Component,
  Sprite,
  Choice,
  Project,
  Timeline,
  Textbox,
} from './../../api/api-types';
import { Component as AngularComponent, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import { errorContext } from 'rxjs/internal/util/errorContext';

/*

 */

@AngularComponent({
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

  readonly activeProjectTitle = signal<string>('');
  readonly activeProjectDescription = signal<string>('');

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
  //Active timeline
  readonly activeSceneTimeline = signal<Timeline | undefined>(undefined);

  //Active action
  readonly activeAction = signal<Action | null>(null);
  //Active Components
  readonly activeComponent = signal<Component | null>(null);
  readonly activeSpritePath = signal<string>('');
  readonly activeTextboxTitle = signal<string>('');
  readonly activeTextboxCps = signal<number>(0);
  readonly activeTextboxContent = signal<string[]>([]);

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
    this.setStartSceneId();
    this.refresh();
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
          //Set the starting scene id attribute
          this.startSceneId.set(project.scenes[0].id);
          //Set the active scene's id
          this.activeSceneId.set(project.scenes[0].id);
          //Set the active scene
          this.activeScene.set(project.scenes.find((s) => s.id === this.activeSceneId())!);
          //Load the timeline for the active scene
          this.loadActiveSceneTimeline();
          //Update the project's data in the database according to the change
          this.api.updateProject(projectId, {
            startSceneId: this.startSceneId()!,
          });
        } else {
          // startSceneId already exists - set it and load timeline
          this.startSceneId.set(project.startSceneId);
          this.activeSceneId.set(project.startSceneId);
          //Set the active scene
          this.activeScene.set(project.scenes.find((s) => s.id === this.activeSceneId())!);
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
        if (this.project()?.startSceneId) {
          // Also update activeSceneId to match startSceneId if not already set
          if (!this.activeSceneId()) {
            this.activeSceneId.set(this.project()?.startSceneId!);
          }
        }
      },
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
        // Load timeline after scenes are loaded and activeSceneId is set
        if (this.activeSceneId()) {
          this.loadActiveSceneTimeline();
        }
      },
    });
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

  refreshActiveTimeline() {
    this.loadActiveSceneTimeline();
  }

  createAction(type: string) {
    switch (type) {
      case 'EnableSprite':
      case 'DisableSprite':
        //Create sprite
        this.api.createSprite({ path: 'Path' }).subscribe({
          next: (sprite) => {
            if (this.activeSceneId() != null) {
              //Create component frame for sprite
              this.api
                .createComponent({
                  sceneId: this.activeSceneId(),
                  title: this.newComponentTitle(),
                  sprite: sprite,
                })
                .subscribe({
                  next: (component) => {
                    //Create action for the sprite
                    this.api
                      .createAction({
                        type: type,
                        timelineId: this.activeScene()?.timeline.id!,
                        componentId: component.id,
                      })
                      .subscribe({
                        next: () => {
                          this.refreshActiveTimeline();
                        },
                        error: (e) => {
                          this.error.set(this.formatError(e));
                          this.loading.set(false);
                        },
                      });
                  },
                });
            }
            if (this.activeScene()?.timeline) {
            }
          },
          error: (e) => {
            this.error.set(this.formatError(e));
            this.loading.set(false);
          },
        });
        break;
      case 'EnableTextbox':
      case 'DisableTextbox':
        this.api
          .createTextbox({
            content: [],
            charPerSecond: 5,
          })
          .subscribe({
            next: (textbox) => {
              this.api
                .createComponent({
                  sceneId: this.activeSceneId(),
                  title: this.newComponentTitle(),
                  textbox: textbox,
                })
                .subscribe({
                  next: (component) => {
                    this.api
                      .createAction({
                        type: type,
                        timelineId: this.activeScene()?.timeline.id!,
                        componentId: component.id,
                      })
                      .subscribe({
                        next: () => {
                          this.refreshActiveTimeline();
                        },
                        error: (e) => {
                          this.error.set(this.formatError(e));
                          this.loading.set(false);
                        },
                      });
                  },
                });
            },
          });
        break;
      case 'EnableChoiceMenu':
      case 'DisableChoiceMenu':
        this.api.createChoiceMenu({}).subscribe({
          next: (choiceMenu) => {
            this.api
              .createComponent({
                sceneId: this.activeSceneId(),
                title: this.newComponentTitle(),
                choiceMenu: choiceMenu,
              })
              .subscribe({
                next: (component) => {
                  this.api
                    .createAction({
                      type: type,
                      timelineId: this.activeScene()?.timeline.id!,
                      componentId: component.id,
                    })
                    .subscribe({
                      next: () => {
                        this.refreshActiveTimeline();
                      },
                      error: (e) => {
                        this.error.set(this.formatError(e));
                        this.loading.set(false);
                      },
                    });
                },
              });
          },
        });
        break;
      default:
        throw errorContext(() => console.log('No such event:' + type));
    }
  }

  getAction(componentId: string) {
    this.api.getComponent(componentId).subscribe({
      next: (comp) => {
        return comp;
      },
    });
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
    this.activeSceneId.set(targetId);
    this.activeScene.set(this.scenes().find((s) => s.id === targetId) ?? null);
    this.loadActiveSceneTimeline();
  }

  editProjectAttributes() {
    this.activeProjectTitle.set(this.project()?.title!);
    this.activeProjectDescription.set(this.project()?.description!);
  }

  saveProjectAttributes() {
    this.api
      .updateProject(this.projectId(), {
        title: this.activeProjectTitle(),
        description:
          this.activeProjectDescription() === '' ? null : this.activeProjectDescription(),
      })
      .subscribe({
        next: (p) => {
          console.log(p);
          this.refresh();
        },
      });
  }

  editAction(action: Action) {
    this.activeAction.set(action);
    this.api.getComponent(action?.componentId!).subscribe({
      next: (component) => {
        this.activeComponent.set(component);
        if (component.sprite != null) {
          this.activeSpritePath.set(component.sprite?.path);
        } else if (component.textBox != null) {
          this.activeTextboxTitle.set(component.textBox?.title!);
          this.activeTextboxContent.set(component.textBox.content);
          this.activeTextboxCps.set(component.textBox.characterPerSecond);
        }
      },
    });
  }

  closeEditAction() {
    this.activeAction.set(null);
    this.activeComponent.set(null);
    //
    this.activeSpritePath.set('');
    //
    this.activeTextboxTitle.set('');
    this.activeTextboxContent.set([]);
    this.activeTextboxCps.set(0);
  }

  saveEditAction(component: Component) {
    if (component.sprite != null) {
      this.api
        .updateSprite(this.activeComponent()?.sprite?.id!, {
          path: this.activeSpritePath(),
        })
        .subscribe({
          next: (s) => console.log(s),
        });
    } else if (component.textBox != null) {
      this.api
        .updateTextbox(this.activeComponent()?.textBox?.id!, {
          title: this.activeTextboxTitle(),
          content: this.activeTextboxContent(),
          charPerSecond: this.activeTextboxCps(),
        })
        .subscribe({
          next: (t) => console.log(t),
        });
    }
  }

  deleteAction(actionId: string) {
    this.api.deleteAction(actionId).subscribe({
      next: () => {
        this.refreshActiveTimeline();
      },
    });
  }

  private loadActiveSceneTimeline() {
    const activeSceneId = this.activeSceneId();
    if (!activeSceneId) return;

    this.api.getScene(activeSceneId).subscribe({
      next: (scene) => {
        this.activeSceneTimeline.set(scene.timeline);
        // Also update the activeScene object with fresh timeline data
        const currentScene = this.activeScene();
        if (currentScene) {
          currentScene.timeline = scene.timeline;
          this.activeScene.set(currentScene);
        }
      },
      error: (e) => {
        console.error('Failed to load scene timeline:', e);
      },
    });
  }

  private formatError(e: unknown) {
    const maybe = e as { message?: string; error?: unknown; status?: number };
    return `API error${maybe?.status ? ` (${maybe.status})` : ''}: ${maybe?.message ?? 'Unknown'}`;
  }
}
