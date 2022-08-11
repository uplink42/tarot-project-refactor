import { Component, OnInit } from '@angular/core';
import { Spread } from '../services/spread.model';
import { premadeSpreads } from './premade-spreads.fixture';
import { SpreadService } from '../services/spread.service';
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-spread-picker',
  templateUrl: './spread-picker.component.html',
  styleUrls: ['./spread-picker.component.scss'],
})
export class SpreadPickerComponent implements OnInit {
  premadeSpreads = premadeSpreads;

  constructor(
    private stepService: StepService,
    private spreadService: SpreadService
  ) {}

  ngOnInit(): void {}

  selectSpread(spread: Spread) {
    this.stepService.nextStep();
    this.stepService.nextStep();
    this.spreadService.setSpread(spread);
  }
}
