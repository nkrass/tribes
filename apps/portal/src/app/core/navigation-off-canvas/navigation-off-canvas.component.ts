import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, Subject } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { OffcanvasService } from '../shared/offcanvas.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'tribes-navigation-off-canvas',
  templateUrl: './navigation-off-canvas.component.html',
  styleUrls: ['./navigation-off-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationOffCanvasComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();

  constructor(
    public offcanvasService: OffcanvasService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
    
  ) {}

  ngOnInit() {
    // this.authService.user
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((user) => {
    //     this.user = user;
    //     this.cdr.markForCheck()
    //   });
  }

  public onLogout(e: Event) {
    this.offcanvasService.toggleOffcanvasNavigation({search_visible: false, menu_visible: false});
    // this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }
  public close(e: Event){
    this.offcanvasService.toggleOffcanvasNavigation({search_visible: false, menu_visible: false});
    e.preventDefault();
  }
  public onNavigationClick() {
    this.offcanvasService.toggleOffcanvasNavigation({search_visible: false, menu_visible: false});
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
