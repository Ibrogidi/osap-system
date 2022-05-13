


import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


import { HostListener } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_sirm6nhu.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  option2: AnimationOptions = {
    path: 'https://assets7.lottiefiles.com/packages/lf20_5x2APt.json',
  };

  animationCreated2(animationItem: AnimationItem): void {
    console.log(animationItem);
  }


option3: AnimationOptions = {
  path: 'https://assets10.lottiefiles.com/private_files/lf30_pguaf3lh.json',
};

animationCreated3(animationItem: AnimationItem): void {
  console.log(animationItem);
}
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
