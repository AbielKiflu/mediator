import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AuthService} from '@core/services/auth.service'


@Component({
  selector: 'app-user-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  login = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',Validators.required)
});

constructor(private authService: AuthService){}

onSubmit() {
  if (this.login.valid) {
    this.authService.login({
      email: this.login.get('email')?.value ?? '',
      password: this.login.get('password')?.value ?? ''
    }).subscribe({
      next: (res) => console.log('Login successful', res),
      error: (err) => console.error('Login failed', err)
    });
  }
}


}
