import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { map, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
import { AppGlobalState, APP_GLOBAL_STATE } from '../../app-global.state';
import { RxState } from '@rx-angular/state';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  public canNavigateBack$ = this.globalState.select('canNavigateBack')
  routerHistory = this.globalState.select('routerHistory')

  readonly showSearch$ = this.globalState.select('showSearch');
  readonly showMenu$ = this.globalState.select('showMenu');
  readonly cart$ = this.globalState.select('cart')
  readonly toggleSearch$ = new Subject<boolean>()
  readonly toggleMenu$ = new Subject<boolean>()
  readonly backButtonPressed$ = new Subject<boolean>()
  readonly routerHistory$ = this.globalState.select('routerHistory')
  constructor(
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
    private location: Location,
    private router: Router,

  ) {
    const goBack$ = this.backButtonPressed$.asObservable().pipe(
      switchMap(() => this.routerHistory$),
      map(history => {
        history.pop();
        return history;
      }),
      map(history => {
        if (history.length) {
          return { routerHistory: history, canNavigateBack: true }
        } else return { routerHistory: history, canNavigateBack: false }
      }),
      tap(({ canNavigateBack }) => {
        if (canNavigateBack) this.location.back() 
        else this.router.navigateByUrl('/') 
      })
    )

    this.globalState.connect('showSearch', this.toggleSearch$.asObservable())
    this.globalState.connect('showMenu', this.toggleSearch$.asObservable())
    this.globalState.hold(goBack$)
  }
}
