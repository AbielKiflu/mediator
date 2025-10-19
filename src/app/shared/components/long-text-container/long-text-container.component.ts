import { Component, Input } from '@angular/core';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-long-text-container',
  standalone: true,
  imports: [
    MatTooltipModule,
  ],
  templateUrl: './long-text-container.component.html',
  styleUrl: './long-text-container.component.scss'
})
export class LongTextContainerComponent {
  @Input() subject: string = "";
  @Input() description: string = "";

  constructor(){}


}
