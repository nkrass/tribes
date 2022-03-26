// import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

// import { Subscription, pipe, Subject } from 'rxjs';

// import { AuthService } from '../../../account/shared/auth.service';

// import { User } from '../../../models/user.model';
// import { takeUntil } from 'rxjs';


// @Component({
//   selector: 'app-navigation-main',
//   templateUrl: './navigation-main.component.html',
//   styleUrls: ['./navigation-main.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class NavigationMainComponent implements OnInit, OnDestroy {
//   public user?: User;
//   private readonly unsubscribe$ = new Subject();
//   @Input() public isCollapsed = true

//   constructor(
//     private authService: AuthService,
//     private cdr: ChangeDetectorRef
//     ){}

//   ngOnInit() {
//     this.authService.user
//     .pipe(takeUntil(this.unsubscribe$))
//     .subscribe((user) => {
//       this.user = user;
//       this.cdr.markForCheck()
//     });
//   }

//   ngOnDestroy() {
//     this.unsubscribe$.next(null);
//     this.unsubscribe$.complete();
//   }
// }
