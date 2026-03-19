import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClient } from '../../api/api-client';
import { PlaybackResponse } from '../../api/api-types';

@Component({
  selector: 'app-play-page',
  imports: [RouterLink],
  templateUrl: './play-page.html',
})
export class PlayPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  readonly projectId = signal<string>('');
  readonly currentSceneId = signal<string | null>(null);

  readonly payload = signal<PlaybackResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    const projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.projectId.set(projectId);
    this.load();
  }

  load(sceneId?: string) {
    this.loading.set(true);
    this.error.set(null);
    this.api.getPlayback(this.projectId(), sceneId).subscribe({
      next: (p) => {
        this.payload.set(p);
        this.currentSceneId.set(p.scene?.id ?? null);
      },
      error: (e) => this.error.set(this.formatError(e)),
      complete: () => this.loading.set(false),
    });
  }

  choose(toSceneId: string) {
    this.load(toSceneId);
  }

  restart() {
    this.currentSceneId.set(null);
    this.load(undefined);
  }

  private formatError(e: unknown) {
    const maybe = e as { message?: string; error?: unknown; status?: number };
    return `API error${maybe?.status ? ` (${maybe.status})` : ''}: ${maybe?.message ?? 'Unknown'}`;
  }
}

