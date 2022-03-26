import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = []
  public canNavigateBack$ = new BehaviorSubject(false)

  constructor(
    private router: Router, 
    private location: Location,
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/'){
          this.canNavigateBack$.next(true)
          this.history.push(event.urlAfterRedirects)
        } else {
          this.canNavigateBack$.next(false)
        }
      }
    })
  
  }
  back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.canNavigateBack$.next(true)
      this.location.back()
    } else {
      this.canNavigateBack$.next(false)
      this.router.navigateByUrl('/')
    }
  }
}