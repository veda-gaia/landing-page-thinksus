import { Component } from '@angular/core';
import { Router } from '@angular/router';
import LocalStorageUtil, { LocalStorageKeys } from 'src/app/util/localStorage.util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarOpen = true;

  constructor(
    private router: Router
  ) {
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  logout() {
    this.router.navigate(['/home'])
    LocalStorageUtil.remove(LocalStorageKeys.user)
  }
}
