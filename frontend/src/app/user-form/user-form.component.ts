import { Component } from '@angular/core';

enum UnitType { Thomn = 0, Page = 1 }

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})


export class UserFormComponent {
  unitTypeOptions = [
    { label: 'Thomn', value: UnitType.Thomn },
    { label: 'Page', value: UnitType.Page }
  ];
  currentStepNumber = 1
  steps = ['unit', 'startUnit', 'endUnit', 'memDays', 'revDays', 'restDays', 'startDate'];
  stepDescriptions: { [key: string]: string } = {
    'unit': 'how much do you want to memorize per day?',
    'startUnit': 'Where do you want to start memorizing from?',
    'endUnit': 'Where do you want to end?',
    'memDays': 'How many days do you want to memorize per cycle?',
    'revDays': 'How many days do you want to revise per cycle?',
    'restDays': 'How many days do you want to rest per cycle?',
    'startDate': 'When Do you want to start your trip?',
  };
  currentStep = this.steps[this.currentStepNumber - 1];
  currentStepDescription = this.stepDescriptions[this.currentStep];
  formData = {
    'unit': UnitType.Thomn,
    'startUnit': 'H1T1',
    'endUnit': 'H15T8',
    'memDays': 2,
    'revDays': 2,
    'restDays': 1,
    'startDate': '',
  };
  getProgress(): number {
    return Math.round(this.currentStepNumber / this.steps.length * 100);
  }

  goToNextStep() {
    this.currentStepNumber += 1;
    if (this.currentStepNumber > this.steps.length) {
      this.currentStepNumber = this.steps.length;
    }
    this.currentStep = this.steps[this.currentStepNumber - 1];
    this.currentStepDescription = this.stepDescriptions[this.currentStep];
  }
  goToPreviousStep() {
    this.currentStepNumber -= 1;
    if (this.currentStepNumber == 0) {
      this.currentStepNumber = 1;
    }
    this.currentStep = this.steps[this.currentStepNumber - 1];
    this.currentStepDescription = this.stepDescriptions[this.currentStep];
  }
}
