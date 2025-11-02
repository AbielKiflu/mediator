import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { CenterDto, CenterService, LanguageDto, LanguageService, UserRole } from '@core/index';
import { UserService } from '../user.service';
import { UserCreateModel } from '../user-create-model';
import { RoleOption } from '@core/interfaces/RoleOption';

@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  centers: CenterDto[] = [];
  languages: LanguageDto[] = [];
  selectedLanguages: LanguageDto[] = [];
  roleOptions: RoleOption[] = Object.keys(UserRole)
    .filter(key => isNaN(Number(key))) 
    .map(key => ({
      value: UserRole[key as keyof typeof UserRole], 
      viewValue: key 
    }));
  constructor(
    private fb: FormBuilder,
    private centerService: CenterService,
    private languageService: LanguageService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCenters();
    this.loadLanguages();
  }
  

  onSubmit() { 
     if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formValue = this.userForm.value;

    const userCreate: UserCreateModel = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      telephone: formValue.telephone,
      email: formValue.email,
      centerId: formValue.centerId,
      userRole: formValue.userRole,
      languages: this.selectedLanguages,
    };
    this.userService.postUser(userCreate).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('User creation failed', error);
      }
    });
    console.log('Submitting UserCreate:', userCreate);
    this.dialogRef.close(userCreate);
  }

 

  onCancel() { 
      this.dialogRef.close();
  }

 private initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      centerId: [null, Validators.required],
      userRole: [UserRole.Client, Validators.required],
      languages: [[], Validators.required],
    });
  }

  onRoleChange(event: MatSelectChange): void{
    const selectedId = event.value;
    const roleName = UserRole[selectedId as keyof typeof UserRole];
    console.info("Selected role Name:", roleName);
  }

  onLanguageChange(event: MatSelectChange): void {
    const selectedIds = event.value;
    this.selectedLanguages = this.languages.filter((l) =>
      selectedIds.includes(l.id)
    );
    console.log('Selected language objects:', this.selectedLanguages);
  }

  private loadCenters(): void {
    this.centerService.getCenters().subscribe({
      next: (r: any) => {
        console.log('Centers loaded:', r);
        this.centers = r?.items ?? [];
      },
      error: (e) => console.error('Centers load error', e),
    });
  }

  private loadLanguages(): void {
    this.languageService.getLanguages().subscribe({
      next: (l: LanguageDto[]) => {
        console.log('Languages loaded:', l);
        this.languages = l ?? [];
      },
      error: (e) => console.error('Languages load error', e),
    });
  }
}
