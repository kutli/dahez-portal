import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.modal.nativeElement.classList.toggle('is-active');
  }
}
