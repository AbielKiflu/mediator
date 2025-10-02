import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserLoginComponent } from "./user-login/user-login.component";

export const userRoutes: Routes = [
    { 
      path: 'user', 
      component: UserListComponent,
      data: { breadcrumb: 'User' },
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