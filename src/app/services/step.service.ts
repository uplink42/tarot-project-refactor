import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  // I changed this to a BehaviorSubject because unlike regular Subjects,
  // they can hold a value and act as a state store for your application.
  private readonly step = new BehaviorSubject<number>(1);

  readonly step$ = this.step.asObservable();

  constructor() {}

  nextStep(): void {
    this.step.next(this.step.value + 1);
  }
}
