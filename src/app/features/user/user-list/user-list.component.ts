import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerComponent } from '../../../shared/components/container/container.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserDto } from '../../../core/interfaces/userDto';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { MatSort } from '@angular/material/sort';
import { ActionComponent } from '../../../shared/components/action/action.component';
import { UserRole } from '../../../core/enums/userRole';

@Component({
  selector: 'app-user-list',
  imports: [
    ContainerComponent,
    MatPaginator,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    ActionComponent,
    MatSortModule],
  
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit  {
  UserRole = UserRole;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'telephone', 'role', 'center', 'languages', 'actions'];
  dataSource!: MatTableDataSource<UserDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
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
    return user.languages.map(l => l.name).join(', ');
  }
  

}
