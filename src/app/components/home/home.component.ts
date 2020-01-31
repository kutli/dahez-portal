import { Component, OnInit } from '@angular/core';
//import { ContentService } from '../../content/content.service';
import { TagService } from '../../tag/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  tags: any[] = [];

  constructor(private tagService: TagService) {
    this.tagService.getTags().subscribe( (data: any) => {
      console.log(data.object);
      this.tags = data.object;
    });
    //this.contentService.getCards();
  }

  ngOnInit() {
  }

}
