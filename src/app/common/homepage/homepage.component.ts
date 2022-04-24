


import { Component } from '@angular/core';



import { HostListener } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  @HostListener('window:scroll', ['$event'])
  
onWindowScroll() {
  let navbar = document.querySelector('.navbar') as HTMLElement;


  if (window.pageYOffset > navbar.clientHeight) {
    navbar.classList.add('navbar-inverse');
    
    
  
  } else {
    navbar.classList.remove('navbar-inverse');

  }
}

}
