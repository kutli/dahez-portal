import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ContentService } from '../content/content.service';
import { Content } from '../content/content.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  contents = new Array<Content>();

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.getContentList();
  }

  /**
   * Method used to get the random content
   */
  getContentList() {
    this.contentService.getRandom()
    .subscribe(
      response => this.contents = response,
      error => console.log(error)
    );
  }

}
