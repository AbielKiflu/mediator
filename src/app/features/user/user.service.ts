import { Injectable } from '@angular/core';
import { UserDto } from '../../core/interfaces/userDto';
import { Observable, of } from 'rxjs';
import { UserRole } from '../../core/enums/userRole';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: UserDto[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      telephone: '123-456-7890',
      email: 'john.doe@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 1, name: 'Main Center', address:'' },
      userRole: UserRole.Admin,
      languages: [{ id: 1, name: 'English' }, { id: 2, name: 'French' }]
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '234-567-8901',
      email: 'jane.smith@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 2, name: 'West Center', address:'' },
      userRole: UserRole.Mediator,
      languages: [{ id: 1, name: 'English' }]
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      telephone: '345-678-9012',
      email: 'michael.brown@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 1, name: 'Main Center', address:'' },
      userRole: UserRole.Client,
      languages: [{ id: 2, name: 'French' }, { id: 3, name: 'Spanish' }]
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      telephone: '456-789-0123',
      email: 'emily.davis@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 3, name: 'East Center', address:'' },
      userRole: UserRole.Client,
      languages: [{ id: 1, name: 'English' }, { id: 4, name: 'German' }]
    },
    {
      firstName: 'William',
      lastName: 'Johnson',
      telephone: '567-890-1234',
      email: 'william.johnson@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 2, name: 'West Center', address:'' },
      userRole: UserRole.Mediator,
      languages: [{ id: 3, name: 'Spanish' }]
    },
    {
      firstName: 'Olivia',
      lastName: 'Martinez',
      telephone: '678-901-2345',
      email: 'olivia.martinez@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 3, name: 'East Center', address:'' },
      userRole: UserRole.Client,
      languages: [{ id: 1, name: 'English' }, { id: 3, name: 'Spanish' }]
    },
    {
      firstName: 'James',
      lastName: 'Wilson',
      telephone: '789-012-3456',
      email: 'james.wilson@example.com',
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      googleId: undefined,
      center: { id: 1, name: 'Main Center', address:'' },
      userRole: UserRole.Mediator,
      languages: [{ id: 2, name: 'French' }]
    }
  ];
  

  constructor() { }

    // Return users as Observable (simulate API call)
    getUsers(): Observable<UserDto[]> {
      return of(this.users);
    }
  
    // Optionally, get a single user by email
    getUserByEmail(email: string): Observable<UserDto | undefined> {
      const user = this.users.find(u => u.email === email);
      return of(user);
    }

}
