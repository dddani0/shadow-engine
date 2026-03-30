import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import { Choice, Project, Scene, Timeline } from '../../api/api-types';

@Component({
  selector: 'app-project-page',
  imports: [RouterLink],
  templateUrl: './project-page.html',
})
export class ProjectPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  readonly projectId = signal<string>('');
  readonly project = signal<Project | null>(null);
  readonly scenes = signal<Scene[]>([]);
  readonly choicesForScene = signal<Record<string, Choice[]>>({});

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // New scene form
  readonly newSceneTitle = signal('');
  readonly newSceneContent = signal('');
  readonly newSceneOrderIndex = signal(0);

  // New choice form
  readonly choiceFromSceneId = signal<string>('');
  readonly choiceToSceneId = signal<string>('');
  readonly choiceLabel = signal<string>('');
  readonly choiceOrderIndex = signal<number>(0);

  readonly canCreateScene = computed(
    () => this.newSceneContent().trim().length > 0 && !this.loading(),
  );
  readonly canCreateChoice = computed(
    () =>
      this.choiceFromSceneId().length > 0 &&
      this.choiceToSceneId().length > 0 &&
      this.choiceLabel().trim().length > 0 &&
      !this.loading(),
  );

  constructor() {
    const id = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(id);
    this.refresh();
  }

  onTextInput(event: Event): string {
    return ((event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '').toString();
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
    return this.choicesForScene()[sceneId] ?? [];
  }

  refresh() {
    const projectId = this.projectId();
    this.loading.set(true);
    this.error.set(null);
    this.api.getProject(projectId).subscribe({
      next: (p) => this.project.set(p),
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
    });

    this.api.listScenes(projectId).subscribe({
      next: (sc) => {
        this.scenes.set(sc);
        if (this.choiceFromSceneId() === '' && sc.length > 0) {
          this.choiceFromSceneId.set(sc[0]!.id);
        }
        if (this.choiceToSceneId() === '' && sc.length > 0) {
          this.choiceToSceneId.set(sc[0]!.id);
        }
        // load choices for each scene
        const map: Record<string, Choice[]> = {};
        this.choicesForScene.set(map);
        sc.forEach((s) => {
          this.api.listChoices(s.id).subscribe({
            next: (choices) => {
              this.choicesForScene.set({
                ...this.choicesForScene(),
                [s.id]: choices as unknown as Choice[],
              });
            },
          });
        });
      },
      error: (e) => {
        this.error.set(this.formatError(e));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  createTimeline() {
    return {
      id: "1",
      actions: []
    }
  }

  createScene() {
    if (!this.canCreateScene()) return;
    this.loading.set(true);
    this.api
      .createScene({
        projectId: this.projectId(),
        title: this.newSceneTitle().trim() || undefined,
        content: this.newSceneContent().trim(),
        orderIndex: Number(this.newSceneOrderIndex() ?? 0),
        Timeline: this.createTimeline(),
      })
      .subscribe({
        next: () => {
          this.newSceneTitle.set('');
          this.newSceneContent.set('');
          this.newSceneOrderIndex.set(0);
          this.refresh();
        },
        error: (e) => {
          this.error.set(this.formatError(e));
          this.loading.set(false);
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

  private formatError(e: unknown) {
    const maybe = e as { message?: string; error?: unknown; status?: number };
    return `API error${maybe?.status ? ` (${maybe.status})` : ''}: ${maybe?.message ?? 'Unknown'}`;
  }
}

