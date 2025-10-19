import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DemandType } from '@core/enums/demandType';
import { DemandTypeIcon } from '@core/enums/demandTypeIcon';

@Component({
  selector: 'app-demand-type-badge',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './demand-type-badge.component.html',
  styleUrl: './demand-type-badge.component.scss'
})
export class DemandTypeBadgeComponent {
 @Input() demandType!: DemandType;

 getIcon(type: string | DemandType): string {

  const enumVal: DemandType =
    typeof type === 'string'
      ? DemandType[type as keyof typeof DemandType]
      : type;

  switch (enumVal) {
    case DemandType.Site:
      return DemandTypeIcon.Site;
    case DemandType.Telephone:
      return DemandTypeIcon.Telephone;
    case DemandType.Video:
      return DemandTypeIcon.Video;
    default:
      return DemandTypeIcon.Site;
  }
}

}
