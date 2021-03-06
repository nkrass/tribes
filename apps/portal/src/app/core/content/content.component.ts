import { Component } from '@angular/core';

import { OffcanvasService } from '../shared/offcanvas.service';

@Component({
  selector: 'tribes-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  constructor(private offcanvasService: OffcanvasService) {}

  onMenuClose(e: Event) {
    const state = this.offcanvasService.offcanvasNavigationState$.getValue()
    state.search_visible = false
    state.menu_visible = false
    this.offcanvasService.toggleOffcanvasNavigation(state)
  }
}
