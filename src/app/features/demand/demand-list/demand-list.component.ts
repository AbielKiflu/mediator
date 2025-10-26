import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActionComponent } from '@shared';
import { ContainerComponent } from 'app/shared/components/container/container.component';
import { DemandService } from '../demand.service';
import { PriorityBadgeComponent } from 'app/shared/components/priority-badge/priority-badge.component';
import { DemandStatusChipComponent } from 'app/shared/components/demand-status-chip/demand-status-chip.component';
import { DemandTypeBadgeComponent } from 'app/shared/components/demand-type-badge/demand-type-badge.component';
import { LongTextContainerComponent } from 'app/shared/components/long-text-container/long-text-container.component';
import { DemandSummary } from '../demand-summary.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DemandCreateComponent } from '../demand-create/demand-create.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-demand-list',
  standalone: true,
    imports: [
    ContainerComponent,
    MatPaginator,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    ActionComponent,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatNativeDateModule,
    PriorityBadgeComponent,
    DemandStatusChipComponent,
    DemandTypeBadgeComponent,
    LongTextContainerComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ],
  templateUrl: './demand-list.component.html',
  styleUrl: './demand-list.component.scss'
})
export class DemandListComponent implements OnInit, AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
  'subject',
  'priority',
  'status',
  'demandType',
  'createdDate',
  'createdByUserName',
  'centerName',
  'action'
  ];  

  dataSource = new MatTableDataSource<DemandSummary>([]);
  totalCount = 0;
  pageSize = 10;
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   constructor(private demandService: DemandService){}


    ngOnInit(): void {
    this.loadDemands(1, this.pageSize);
  }
  
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  
    editDemand(demand: DemandSummary) {
    }

    createDemand() {
      const dialogRef = this.dialog.open(DemandCreateComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    onPageChange(event: any): void {
    this.loadDemands(event.pageIndex + 1, event.pageSize);
    }

    loadDemands(pageNumber: number, pageSize: number): void {
    this.isLoading = true;
    this.demandService.loadDemands(pageNumber, pageSize).subscribe({
      next: res => {
        this.dataSource.data = res.items;
        this.totalCount = res.totalCount;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading demands', err);
        this.isLoading = false;
      }
    });
  }
}
