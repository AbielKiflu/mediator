import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CenterDto, CenterService, LanguageDto, LanguageService, UserDto, UserRole } from '@core/index';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RoleOption } from '@core/interfaces/RoleOption';
import { UserUpdateModel } from '../user-update-model';


@Component({
  selector: 'app-user-update',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit{
  userForm!: FormGroup;
  centers: CenterDto[] = [];
  languages: LanguageDto[] = [];
  selectedLanguages: LanguageDto[] = [];
  userId: number = 0;
  roleOptions: RoleOption[] = Object.keys(UserRole)
    .filter(key => isNaN(Number(key))) 
    .map(key => ({
      value: UserRole[key as keyof typeof UserRole], 
      viewValue: key 
    }));



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private centerService: CenterService,
    private languageService: LanguageService,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Partial<UserDto>
  ){}


  ngOnInit(): void {
    this.initForm();
    this.loadCenters();
    this.loadLanguages();
  }



  onCancel() { 
      this.dialogRef.close();
  }

  onSubmit() { 
  if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formValue = this.userForm.value;

    const userUpdate: UserUpdateModel = {
      id: this.userId,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      telephone: formValue.telephone,
      centerId: formValue.centerId,
      userRole: formValue.userRole,
      languages: this.selectedLanguages,
    };
    this.userService.putUser(userUpdate).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('User update failed', error);
      }
    });
    console.log('Submitting Update user:', userUpdate);
    this.dialogRef.close(userUpdate);
  }

 private initForm(): void {
    const initialRole: UserRole = (this.data?.userRole ?? UserRole.Mediator) as UserRole;
    this.userId = this.data?.id ?? 0;
    this.userForm = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      telephone: [this.data?.telephone || '', Validators.required],
      email: [
        this.data?.email || '',
        [Validators.required, Validators.email],
      ],
      centerId: [this.data?.center?.id || null, Validators.required],
      userRole: [ UserRole[initialRole], Validators.required], 
      languages: [this.data?.languages?.map(l => l.id) || [], Validators.required],
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