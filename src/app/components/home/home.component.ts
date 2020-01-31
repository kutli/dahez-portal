import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../content/content.service';
import { TagService } from '../../tag/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  dataList: any[] = [];
  arr1: any[] = [];

  constructor(private contentService: ContentService) {
    this.contentService.getCards().subscribe((data: any) => {
      this.dataList = data.object;
    });
    this.arr1 = this.dataList.slice(1, 2);
    console.log(this.dataList);
  }

  ngOnInit() {
  }

}
