import { AfterViewInit, Component, OnInit, ViewChild,  } from '@angular/core';
import { ContainerComponent } from '@shared';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserDto } from '../../../core/interfaces/userDto';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { MatSort } from '@angular/material/sort';
import { ActionComponent } from '@shared';
import { UserRole } from '@core/enums/userRole';
import {MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';

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

  constructor(private userService: UserService){}

ngOnInit(): void {
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


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(user: UserDto) {
    console.log('Edit:', user);
  }

  getLanguages(user: UserDto): string {
    return user.languages.map(l => l.description).join(', ');
  }
  

}
