import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from "@shared";

@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, MatButtonModule, NavbarComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mediator';
}
