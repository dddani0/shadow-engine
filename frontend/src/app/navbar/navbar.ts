import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
