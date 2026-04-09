import { Component, inject, signal } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../api/api-types';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'project-collection-page',
  imports: [],
  templateUrl: './project-collection-page.html',
})
export class ProjectCollectionPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  private readonly projects = signal<Project[] | null>(null);

  constructor() {
    this.refresh();
  }

  refresh() {
    this.api.listProjects().subscribe({
      next: (p) => {
        this.projects.set(p);
      },
      error: (err) => console.log(err),
    });
  }
}
