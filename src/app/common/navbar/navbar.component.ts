import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
tooltip:string = "Online Survey Analyzer Platform";
isAdminLogged:boolean = false;
isRespondantLogged:boolean = false;
isResearcherLogged:boolean = false;
isNoneLogged: boolean = true;
active = 1;
  constructor() { }

  ngOnInit(): void {
  }

   // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;

}
