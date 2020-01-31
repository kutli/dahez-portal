import { Component, OnInit } from '@angular/core';
import { TagService } from '../../tag/tag.service';
import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {

  tagList: any[] = [];

  constructor(private tagService: TagService) {
    this.tagService.getTags().subscribe((data: any) => {
      this.tagList = data.object;
    });
  }
  ngOnInit() {
  }

}
