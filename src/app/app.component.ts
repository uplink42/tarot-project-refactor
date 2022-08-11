import { Component } from '@angular/core';
import { SpreadService } from './services/spread.service';
import { StepService } from './services/step.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-tarot';

  // There's no need to manage subscriptions if you write your rxjs logic this way
  // Note that both observers are subcribed in the template with the async pipe
  // There's no need to duplicate the spread and step values in this component,
  step$ = this.stepService.step$;

  spread$ = this.spreadService.spread$;

  constructor(
    private stepService: StepService,
    private spreadService: SpreadService
  ) {}
}
