import { Routes } from '@angular/router';
import { userRoutes } from './features/user/user.route';
import { demandRoutes } from './features/demand/demand.route';

export const routes: Routes = 
        [
            ... userRoutes,
            ...demandRoutes,
            {path:'**', redirectTo:'login'}
        ];

