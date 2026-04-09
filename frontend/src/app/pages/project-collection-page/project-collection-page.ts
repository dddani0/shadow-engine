import { Component, inject, signal } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../api/api-types';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'project-collection-page',
  imports: [RouterModule],
  templateUrl: './project-collection-page.html',
})
export class ProjectCollectionPage {
  private readonly api = inject(ApiClient);
  private readonly route = inject(ActivatedRoute);

  readonly projects = signal<Project[] | null>(null);

  allowedProjectsPerPage = 4;
  readonly startIndexOfProjects = signal<number>(0);
  readonly pages = signal<number>(0);
  readonly page = signal<number>(0);

  constructor() {
    this.refresh();
  }

  refresh() {
    this.api.listProjects().subscribe({
      next: (p) => {
        this.projects.set(p);
        this.pages.set(this.projects()?.length! % this.allowedProjectsPerPage);
        console.log(this.pages());
      },
      error: (err) => console.log(err),
    });
  }

  deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;
    this.api.deleteProject(id).subscribe({
      next: () => this.refresh(),
    });
  }

  setPage(index: number) {
    this.page.set(index);
  }

  nextPage() {
    this.page.set(this.page() + 1);
  }

  previousPage() {
    this.page.set(this.page() - 1);
  }
}
