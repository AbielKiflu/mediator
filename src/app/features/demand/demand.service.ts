import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DemandPriority } from '@core/enums/demandPriority';
import { DemandStatus } from '@core/enums/demandStatus';
import { DemandType } from '@core/enums/demandType';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageResult } from '@core/interfaces/pageResult';
import { DemandSummary } from './demand-summary.model';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  private readonly baseUrl = environment.apiUrl;
  dataSource!: MatTableDataSource<DemandSummary>;

  constructor(private http: HttpClient) { }

  private mapDemand = (d: any): DemandSummary => {
    return {
    id: d.id ?? 0,
    subject:d.subject??'',
    description: d.description ?? '',
    priority: d.priority in DemandPriority ? d.priority : DemandPriority.Normal,
    status: d.status in DemandStatus ? d.status : DemandStatus.Pending,
    demandType: d.demandType in DemandType ? d.demandType : DemandType.Site,
    createdDate: d.createdDate ? new Date(d.createdDate) : new Date(),
    createdByUserName: d.createdByUserName ?? '',
    centerName: d.centerName ?? null
    };
  }

loadDemands(pageNumber = 1, pageSize = 10): Observable<PageResult<DemandSummary>> {
  const url = `${this.baseUrl}/demands?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<PageResult<DemandSummary>>(url)
  .pipe(
      map(response => ({
        ...response,
        items: response.items.map(this.mapDemand)
      }))
  );
}


 
}
