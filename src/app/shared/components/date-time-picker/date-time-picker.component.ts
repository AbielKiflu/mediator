import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-date-time-picker',
  standalone:true,
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent {
  @Input() title: string = 'Date time';
  @Input() value: Date = new Date();

  constructor(){}
}

