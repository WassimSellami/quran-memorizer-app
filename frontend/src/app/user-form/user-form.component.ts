import { Component } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  nbSteps = 7;
  currentStepNumber = 1
  steps = ['unit', 'startUnit', 'endUnit', 'cycle', 'ratio', 'rest', 'startDate'];
  stepDescriptions: { [key: string]: string } = {
    'unit': 'choose unit type',
    'startUnit': 'select start unit',
    'endUnit': 'select end unit',
    'cycle': 'define cycle type',
    'ratio': 'enter ratio value',
    'rest': 'set rest time',
    'startDate': 'choose a start date',
  };
  currentStep = this.steps[this.currentStepNumber - 1];
  currentStepDescription = this.stepDescriptions[this.currentStep];

  getProgress(): number {
    return Math.round(this.currentStepNumber / this.nbSteps * 100);
  }

  goToNextStep() {
    this.currentStepNumber += 1;
    this.currentStep = this.steps[this.currentStepNumber];
    this.currentStepDescription = this.stepDescriptions[this.currentStep];
  }
}
