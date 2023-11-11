import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  setLanguage() {
  }

  goToAdminPortal() {
    // check privilege and navigate based on that
    this.router.navigateByUrl('/home/users/allusers');
  }
  
  logoutUser() {
    // logout user and navigate
    this.router.navigateByUrl('/login');
  }
}
