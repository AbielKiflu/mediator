import { Component, OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CenterDto, CenterService, LanguageDto, LanguageService, UserRole } from '@core/index';
import { UserCreate } from '../UserCreate';

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
  roles = Object.values(UserRole).filter(v => typeof v === 'string') as string[];

  constructor(
    private centerService: CenterService,
    private languageService: LanguageService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: Partial<UserCreate>
  ){
      this.userForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      telephone: [data?.telephone || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      centerId: [data?.centerId || null, Validators.required],
      userRole: [data?.userRole || UserRole.Client, Validators.required],
      languages: [this.data?.languages || [], Validators.required] 
    });
  }

  ngOnInit(): void {
 this.centerService.getCenters().subscribe({
    next: (r: any) => {
      console.log('Centers loaded:', r);
      this.centers = r?.items; 
    },
    error: e => console.error('centers load error', e)
  });

   this.languageService.getLanguages().subscribe({
    next: (l: LanguageDto[]) => {
      console.log('Languages loaded:', l);
      this.languages = [... l]; 
    },
    error: e => console.error('languages load error', e)
  });
  }
  

  onSubmit() { 
    if (this.userForm.valid) {
      console.table(this.userForm.value);
    }
  }

  onCancel() { 
      this.dialogRef.close();
  }
}
