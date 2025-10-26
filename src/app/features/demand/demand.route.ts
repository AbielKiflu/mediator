import { Routes } from "@angular/router";
import { DemandListComponent } from "./demand-list/demand-list.component";
import { AuthGuard } from "@core/index";

export const demandRoutes: Routes = [
    {
        path: 'demands', 
        component: DemandListComponent,
        data: { breadcrumb: 'Demands' },
        canActivate: [AuthGuard],
    }
];

//outgoing-demands incoming-demands