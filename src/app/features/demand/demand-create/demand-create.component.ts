import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DemandPriority } from '@core/enums/demandPriority';
import { DemandStatus } from '@core/enums/demandStatus';
import { DemandType } from '@core/enums/demandType';
import { DemandCreate } from '../demand-create.model';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DateTimePickerComponent } from 'app/shared/components/date-time-picker/date-time-picker.component';

@Component({
  selector: 'app-demand-create',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    DateTimePickerComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ],
  templateUrl: './demand-create.component.html',
  styleUrl: './demand-create.component.scss'
})
export class DemandCreateComponent {
  form: FormGroup;

  demandTypes = Object.values(DemandType).filter(v => typeof v === 'string') as string[];
  priorities = Object.values(DemandPriority).filter(v => typeof v === 'string') as string[];
  statuses = Object.values(DemandStatus).filter(v => typeof v === 'string') as string[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DemandCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: DemandCreate
  ){
     this.form = this.fb.group({
      subject: [data?.subject || '', Validators.required],
      description: [data?.description || '', Validators.required],
      startDate: [data?.startDate || new Date(), Validators.required],
      finishDate: [data?.finishDate || new Date(), Validators.required],
      priority: [data?.priority ?? DemandPriority.Normal],
      status: [data?.status ?? DemandStatus.Pending],
      demandType: [data?.demandType ?? DemandType.Site],
      demandedUserId: [data?.demandedUserId ?? null],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as DemandCreate);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
