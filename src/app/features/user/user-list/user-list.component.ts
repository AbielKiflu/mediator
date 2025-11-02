import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { ContainerComponent } from '@shared';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserDto } from '../userDto';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { MatSort } from '@angular/material/sort';
import { ActionComponent } from '@shared';
import { UserRole } from '@core/enums/userRole';
import {MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  imports: [
    ContainerComponent,
    MatPaginator,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    ActionComponent,
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule],
  
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, AfterViewInit  {
  isLoading = false;
  UserRole = UserRole;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'telephone', 'role', 'center', 'languages', 'actions'];
  dataSource: MatTableDataSource<UserDto> = new MatTableDataSource<UserDto>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ){}

ngOnInit(): void {
this.loadUserList();
}
  loadUserList() {
  this.isLoading = true;

  this.userService.getUsers().subscribe({
    next: (users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load users', err);
      this.isLoading = false;
    }
  });
  }

    createUser() {
      const dialogRef = this.dialog.open(UserCreateComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.loadUserList();
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(user: Partial<UserDto>) {
     const dialogRef = this.dialog.open(UserUpdateComponent,{data:user || {}});
      dialogRef.afterClosed().subscribe(result => {
        this.loadUserList();
      });
  }

  getLanguages(user: UserDto): string {
    return user.languages.map(l => l.description).join(', ');
  }
  

}
