import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { AuthGuard } from "@core/index";


export const userRoutes: Routes = [
    { 
      path: 'users', 
      component: UserListComponent,
      data: { breadcrumb: 'Users' },
      canActivate: [AuthGuard],
      children: [
        { 
          path: 'detail', 
          component: UserDetailComponent,
          data: { breadcrumb: 'Detail' }
         },
      ]
    },
    { 
      path: 'login', 
      component: UserLoginComponent
     },
  ];