import { Component, signal } from '@angular/core';

@Component({
  selector: 'project-collection-page',
  imports: [],
  templateUrl: './project-collection-page.html',
})
export class AboutPage {
  projects = signal('')
}
