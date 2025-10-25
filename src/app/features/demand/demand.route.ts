import { Routes } from "@angular/router";
import { DemandListComponent } from "./demand-list/demand-list.component";

export const demandRoutes: Routes = [
    {
          path: 'demands', 
              component: DemandListComponent,
              data: { breadcrumb: 'Demands' },
    }
];