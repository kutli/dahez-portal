import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AboutUsConstants } from './about-us.constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal: ElementRef;

  MISION_VISION = AboutUsConstants.MISION_VISION;
  SERVICES = AboutUsConstants.SERVICES;

  constructor() { }

  ngOnInit() {
  }
}
