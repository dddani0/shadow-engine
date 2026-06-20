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
  readonly startScene = signal<Scene | null>(null);
  readonly startSceneTitle = signal<string>('');
  //GET RID OF NEXT TIME
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
  readonly activeChoiceMenuTitle = signal<string>('');
  readonly activeChoiceMenuDescription = signal<string>('');
  readonly activeChoiceMenuChoices = signal<Choice[]>([]);
  readonly activeLoadSceneId = signal<string>('');
  readonly activeLoadScene = signal<Scene | null>(null);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // New scene form
  readonly newSceneTitle = signal('');
  readonly newSceneOrderIndex = signal(0);
  //
  readonly activeSceneTitle = signal<string>('');

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

  readonly actionSwapCooldown: Number = 3000;
  readonly actionSwapDisabled = false;

  constructor() {
    //Set id from route's current version.
    const id = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(id);
    this.UpdateSceneNamingConvention();
    this.setStartSceneId();
    this.refresh();
  }

  hasMultipleScenes(): boolean {
    return this.scenes().length > 1;
  }

  updateContentItem(index: number, event: Event) {
    const newValue = (event.target as HTMLTextAreaElement).value;

    this.activeTextboxContent.update((items) => {
      const updatedItems = [...items];
      updatedItems[index] = newValue;
      return updatedItems;
    });
  }

  onTextInput(event: Event): string {
    return (
      (event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? ''
    ).toString();
  }

  onNumberInput(event: Event): number {
    const rawValue = (
      (event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? ''
    ).toString();

    const cleanValue = rawValue.replace(/[^0-9]/g, '');

    return Number(cleanValue);
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
        this.api.listScenes(projectId).subscribe({
          next: (fetchedScenes) => {
            if (project.startSceneId == null) {
              // startSceneId doesn't exists in the db - set it and load timeline
              // start scene marks the initial scene which loads ingame.
              this.startSceneId.set(fetchedScenes[0].id);
              //Set the active scene's id
              this.activeSceneId.set(this.startSceneId());
              //Set the active scene
              this.activeScene.set(
                fetchedScenes.find((scene) => scene.id === project.scenes[0].id)!,
              );
              this.api
                .updateProject(projectId, {
                  startSceneId: this.startSceneId(),
                })
                .subscribe({
                  next: () => this.refresh(),
                });
            } else {
              // startSceneId already exists - set it and load timeline
              this.startSceneId.set(project.startSceneId);
              this.startScene.set(project.scenes.find((s) => s.id === this.startSceneId())!);
              this.startSceneTitle.set(
                project.scenes.find((s) => s.id === this.startSceneId())!.title!,
              );
              console.log(this.startSceneTitle());
              this.activeSceneId.set(project.startSceneId);
              //Set the active scene
              this.activeScene.set(project.scenes.find((s) => s.id === this.activeSceneId())!);
            }
          },
        });
      },
    });
  }

  UpdateSceneNamingConvention() {
    this.newSceneTitle.set(`New scene${this.scenes().length}`);
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
        this.startSceneId.set(project.startSceneId);
        this.startScene.set(project.scenes.find((scene) => scene.id === this.startSceneId())!);
        this.startSceneTitle.set(
          project.scenes.find((scene) => scene.id === this.startSceneId())!.title!,
        );
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
          this.activeSceneId.set(this.project()?.startSceneId!);
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
          this.UpdateSceneNamingConvention();
          this.refresh();
          console.log(this.newSceneTitle());
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
                        variables: [],
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
                        variables: [],
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
                      variables: [],
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
      case 'LoadScene':
        this.api
          .createAction({
            type: type,
            timelineId: this.activeScene()?.timeline.id!,
            variables: [],
            loadSceneId: this.startSceneId(),
          })
          .subscribe({
            next: () => this.refreshActiveTimeline(),
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
    this.loading.set(true);
    this.api.deleteScene(sceneId).subscribe({
      next: () => {
        this.api.listScenes(this.projectId()).subscribe({
          next: (sl) => {
            this.activeSceneId.set(sl[0].id);
            this.activeScene.set(sl.find((s) => s.id === this.activeSceneId())!);
            if (this.project()?.startSceneId === sceneId) {
              this.api
                .updateProject(this.projectId(), {
                  startSceneId: this.activeSceneId(),
                })
                .subscribe({
                  next: () => this.refresh(),
                });
            }
          },
        });
        this.refresh();
      },
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

  SwapActionUpward(action: Action) {
    const timeline = this.activeSceneTimeline();
    if (!timeline?.actions) return;

    const actions = timeline.actions;
    const index = actions.findIndex((a) => a.id === action.id);

    if (index <= 0) return;

    [actions[index - 1], actions[index]] = [actions[index], actions[index - 1]];

    this.api.updateTimeline(this.activeSceneTimeline()?.id!, {
      actions: this.activeSceneTimeline()?.actions,
    });

    this.refreshActiveTimeline();
    this.refresh();
  }

  swapActionDownward(action: Action) {
    const timeline = this.activeSceneTimeline();
    if (!timeline?.actions) return;

    const actions = timeline.actions;
    const index = actions.findIndex((a) => a.id === action.id);

    [actions[index + 1], actions[index]] = [actions[index], actions[index + 1]];

    this.api.updateTimeline(this.activeSceneTimeline()?.id!, {
      actions: this.activeSceneTimeline()?.actions!,
    });

    this.refreshActiveTimeline();
    this.refresh();
  }

  changeScene(id: string) {
    if (this.scenes().find((scene) => scene.id === id) === undefined) {
      console.log('Scene not found!');
      return;
    }
    const sceneIdx = this.scenes().find((scene) => scene.id === id)?.id;
    this.activeSceneId.set(sceneIdx!);
    this.activeScene.set(this.scenes().find((s) => s.id === this.activeSceneId()) ?? null);
    this.loadActiveSceneTimeline();
  }

  editScene(scene: Scene) {
    this.activeSceneTitle.set(scene.title!);
  }

  saveScene() {
    this.api
      .updateScene(this.activeSceneId(), {
        title: this.activeSceneTitle(),
      })
      .subscribe({
        next: (scene) => {
          console.log(scene.title);
          this.refresh();
        },
      });
  }

  closeScene() {
    this.activeSceneTitle.set('');
  }

  setProjectStartSceneId(id: string) {
    this.startSceneId.set(id);
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
        startSceneId: this.startSceneId(),
      })
      .subscribe({
        next: (p) => {
          console.log(p);
          this.refresh();
        },
      });
  }

  closeProjectAttributes() {
    this.api.getProject(this.projectId()).subscribe({
      next: (p) => {
        this.activeProjectTitle.set(p.title);
        this.activeProjectDescription.set(p.description ?? '');
        this.startSceneId.set(p.startSceneId);
        console.log(p);
      },
    });
  }

  editAction(action: Action) {
    this.activeAction.set(action);
    if (action.componentId) {
      this.api.getComponent(action?.componentId!).subscribe({
        next: (component) => {
          this.activeComponent.set(component);
          if (component.sprite != null) {
            console.log('Component is a sprite');
            this.activeSpritePath.set(component.sprite?.path);
          } else if (component.textBox != null) {
            console.log('Component is a textbox');
            this.activeTextboxTitle.set(component.textBox.title!);
            this.activeTextboxContent.set(component.textBox.content);
            this.activeTextboxCps.set(component.textBox.charPerSecond);
          } else if (component.choiceMenu != null) {
            console.log('Component is a choicemenu');
            this.activeChoiceMenuTitle.set(component.choiceMenu?.title!);
            this.activeChoiceMenuDescription.set(component.choiceMenu?.description!);
            this.activeChoiceMenuChoices.set(component.choiceMenu?.choices!);
          }
        },
      });
    } else {
      if (action.loadSceneId !== undefined) {
        this.setLoadScene(action.loadSceneId);
      }
    }
  }

  setLoadScene(id: string) {
    this.activeLoadSceneId.set(id);
    this.activeLoadScene.set(this.scenes().find((s) => s.id === this.activeLoadSceneId())!);
    console.log(this.activeLoadSceneId());
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
    //
    this.activeChoiceMenuTitle.set('');
    this.activeChoiceMenuDescription.set('');
    this.activeChoiceMenuChoices.set([]);
    //
    this.activeLoadSceneId.set('');
    this.activeLoadScene.set(null);
  }

  saveEditAction(component: Component) {
    if (component === null) {
      this.api.getAction(this.activeAction()?.id!).subscribe({
        next: (e) => console.log(e.loadSceneId),
      });
      this.api
        .updateAction(this.activeAction()!.id, {
          loadSceneId: this.activeLoadSceneId(),
        })
        .subscribe({
          next: (l) => {
            console.log(l);
            this.refresh();
          },
        });
    } else {
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
      } else if (component.choiceMenu != null) {
        this.api
          .updateChoiceMenu(component.choiceMenu.id, {
            title: this.activeChoiceMenuTitle(),
            description: this.activeChoiceMenuDescription(),
            choices: this.activeChoiceMenuChoices(),
          })
          .subscribe({
            next: (c) => console.log(c),
          });
      }
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
