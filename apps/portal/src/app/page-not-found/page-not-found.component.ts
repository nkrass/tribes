import { Component, OnInit, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../src/environments/environment'
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';
import { Request} from "express"
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  public staticAssetsUrl: string = staticAssetsUrl
  constructor(
    private title: Title, 
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) private request: Request
    ){}
  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      if (this.request.res) {
        this.request.res.status(404);
      }
    }
    this.title.setTitle('Документ не найден - 404');
    this.meta.updateTag({ name: 'description', content: 'Ошибка 404 Документ не найден' });
  }
}
