import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpGetLoadingService {
  private counter = 0;
  private readonly subject = new BehaviorSubject<boolean>(false);

  /** Emite true mientras existan GET en vuelo; aplica anti-flicker al ocultar */
  readonly loading$: Observable<boolean> = this.subject.asObservable().pipe(
    distinctUntilChanged(),
    switchMap(v => v ? [true] : timer(120).pipe(switchMap(() => [false])))
  );

  show(): void {
    this.counter++;
    if (this.counter === 1) this.subject.next(true);
  }

  hide(): void {
    if (this.counter > 0) this.counter--;
    if (this.counter === 0) this.subject.next(false);
  }

  forceClear(): void {
    this.counter = 0;
    this.subject.next(false);
  }
}
