import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DemandPriorityColor } from '@core/enums/demandPirorityColor';
import { DemandPriority } from '@core/enums/demandPriority';
import { DemandPriorityIcon } from '@core/enums/demandPriorityIcon';

@Component({
  selector: 'app-priority-badge',
  standalone:true,
  imports: [MatIcon],
  templateUrl: './priority-badge.component.html',
  styleUrl: './priority-badge.component.scss'
})
export class PriorityBadgeComponent {
 
 @Input() priority!: DemandPriority;

getColor(priority: string | DemandPriority): string {
  const numPriority = DemandPriority[priority as keyof typeof DemandPriority]; 
  return numPriority === DemandPriority.Urgent
    ? DemandPriorityColor.Urgent
    : DemandPriorityColor.Normal;
}


getIcon(priority: string | DemandPriority): string {
    const numPriority = DemandPriority[priority as keyof typeof DemandPriority];
    return numPriority === DemandPriority.Urgent
      ? DemandPriorityIcon.Urgent
      : DemandPriorityIcon.Normal;
}

  
}
