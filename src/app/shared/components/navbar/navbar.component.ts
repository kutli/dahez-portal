import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animations } from '../../../util/animation.constants';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [Animations.FADE_OUT]
})
export class NavbarComponent implements OnInit {

  @ViewChild('navBurger', {static: false}) navBurger: ElementRef;
  @ViewChild('navMenu', {static: false}) navMenu: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  toggleNavBar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

}
