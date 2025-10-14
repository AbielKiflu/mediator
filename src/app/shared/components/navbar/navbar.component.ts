import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import {FooterComponent} from '@shared';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    FooterComponent,
    BreadcrumbComponent,
    CommonModule,
    RouterOutlet
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isHandset: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      )
      .subscribe(isHandset => this.isHandset = isHandset);
}

  goToSettings() {
    // Navigate to settings page
  }

  logout() {
    // Perform logout logic
  }

}
