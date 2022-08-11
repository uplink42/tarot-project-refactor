import { Component, Input } from '@angular/core';
import { Card } from '../services/spread.model';
import { SpreadService } from '../services/spread.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  // FIXME Provide a blank card initializer
  @Input() card!: Card;

  constructor(private spreadService: SpreadService) {}

  flipCard() {
    // FIXME i can't be optional
    this.spreadService.flipCard(this.card.i || 0);
  }
}
