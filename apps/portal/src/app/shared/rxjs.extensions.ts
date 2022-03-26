import { first, Observable, switchMap } from "rxjs";

export function waitFor<T>(signal: Observable<any>) {
  return (source: Observable<T>) => signal.pipe(
      first(),
      switchMap(_ => source),
  );
}