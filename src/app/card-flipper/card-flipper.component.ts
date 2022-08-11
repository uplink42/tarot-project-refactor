import { Component } from '@angular/core';
import { SpreadService } from '../services/spread.service';

@Component({
  selector: 'app-card-flipper',
  templateUrl: './card-flipper.component.html',
  styleUrls: ['./card-flipper.component.scss'],
})
export class CardFlipperComponent {
  spread$ = this.spreadService.spread$;

  constructor(private spreadService: SpreadService) {
    // Since this is an http observable, there's no need to unsubscribe from it
    // Generally speaking, all observables derived from the framework (router, http, etc) are unsubscribed automatically
    this.spreadService.fetchCards().subscribe();
  }

  flipCard(i: number) {
    this.spreadService.flipCard(i);
  }
}
