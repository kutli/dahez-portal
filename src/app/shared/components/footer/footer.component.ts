import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  address = 'Av. patria 1957 int. f-7';
  email = 'ingenieriadahez@gmail.com';
  phoneNumb = 3323115597;
  officeNumb = 3312642603 ;
  ngOnInit() {
  }
}
