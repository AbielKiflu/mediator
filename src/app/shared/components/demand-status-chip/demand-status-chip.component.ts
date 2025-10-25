import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DemandStatus } from '@core/enums/demandStatus';
import { StatusColors } from '@core/enums/statusColor';

@Component({
  selector: 'app-demand-status-chip',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './demand-status-chip.component.html',
  styleUrl: './demand-status-chip.component.scss'
})
export class DemandStatusChipComponent {
   @Input() status!: DemandStatus;

  getStatusColor(status: string | DemandStatus): string {
        return StatusColors[status as keyof typeof StatusColors] || '#9E9E9E';}

}
