import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import { Project } from '../../api/api-types';
import { Scene } from '../../api/api-types';
import { Timeline } from '../../api/api-types';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage {
  private readonly api = inject(ApiClient);
  private readonly router = inject(Router);

  readonly projects = signal<Project[] | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly newTitle = signal('');
  readonly newDescription = signal('');

  readonly newScene = signal<Scene[] | null>(null);

  readonly newTimeline = signal<Timeline | null>(null);

  readonly canCreate = computed(() => this.newTitle().trim().length > 0 && !this.loading());

  constructor() {
    this.refresh();
  }

  onTextInput(e: Event): string {
    return ((e.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '').toString();
  }

  refresh() {
    this.loading.set(true);
    this.error.set(null);
    this.api.listRecentProjects().subscribe({
      next: (p) => this.projects.set(p),
      error: (e) => this.error.set(this.formatError(e)),
      complete: () => this.loading.set(false),
    });
  }

  createProject() {
    if (!this.canCreate()) return;
    this.loading.set(true);
    this.error.set(null);
    this.api
      .createProject({
        title: this.newTitle().trim(),
        description: this.newDescription().trim() || undefined,
      })
      .subscribe({
        next: async (p) => {
          this.newTitle.set('');
          this.newDescription.set('');
          await this.router.navigate(['/projects', p.id]);
        },
        error: (e) => {
          this.error.set(this.formatError(e));
          this.loading.set(false);
        },
      });
  }

  deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;
    this.loading.set(true);
    this.api.deleteProject(id).subscribe({
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
