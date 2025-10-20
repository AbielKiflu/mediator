import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { Crumb } from './crumb';


@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  get crumbs(): Crumb[] {
    return this.breadcrumbService.breadcrumbs;
    }

  constructor(private breadcrumbService: BreadcrumbService){}
   
}
