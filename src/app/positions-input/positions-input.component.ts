import { Component, Input } from '@angular/core';
import { Spread } from '../services/spread.model';
import { SpreadService } from '../services/spread.service';
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-positions-input',
  templateUrl: './positions-input.component.html',
  styleUrls: ['./positions-input.component.scss'],
})
export class PositionsInputComponent {
  @Input() spread!: Spread;

  constructor(
    private stepService: StepService,
    private spreadService: SpreadService
  ) {}

  ngOnInit() {
    // It's better to keep initialization logic in OnInit
    this.addPosition();
  }

  addPosition() {
    this.spreadService.addPosition();
  }

  updatePosition(e: Event, i: number) {
    const target = e.target as HTMLInputElement;
    this.spreadService.updatePosition(i, target!.value);
  }

  removePosition(i: number) {
    this.spreadService.removePosition(i);
  }

  validatePositions(length: number) {
    if (!length) {
      window.alert('You need at least one position in your spread!');
      return;
    }

    this.stepService.nextStep();
  }
}
