import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ContentService } from '../content/content.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  contents: Content [];

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.getContentList();
  }

  /**
   * Method used to get the random content
   */
  getContentList() {
    this.contentService.getList()
    .subscribe(
      response => {
        this.contents = response.object.slice(0, 4);
      },
      error => console.log(error)
    );
  }

}
