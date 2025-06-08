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
  steps = ['unitType', 'startUnit', 'endUnit', 'memDays', 'revDays', 'restDays', 'startDate', 'preview'];
  stepDescriptions: { [key: string]: string } = {
    'unitType': 'how much do you want to memorize per day?',
    'startUnit': 'Where do you want to start memorizing from?',
    'endUnit': 'Where do you want to end?',
    'memDays': 'How many days do you want to memorize per cycle?',
    'revDays': 'How many days do you want to revise per cycle?',
    'restDays': 'How many days do you want to rest per cycle?',
    'startDate': 'When Do you want to start your trip?',
    'preview': 'Done! Now you can generate a preview of your plan!',
  };
  currentStep = this.steps[this.currentStepNumber - 1];
  currentStepDescription = this.stepDescriptions[this.currentStep];
  formData = {
    'unitType': UnitType.Thomn,
    'startUnit': 'H1T1',
    'endUnit': 'H15T8',
    'memDays': 2,
    'revDays': 2,
    'restDays': 1,
    'startDate': '2025-06-11',
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

  getFormattedSummary() {
    return `
    Memorization Unit: ${UnitType[this.formData.unitType]}
    Start from: ${this.formData.startUnit}
    End at: ${this.formData.endUnit}
    Memorization days per cycle: ${this.formData.memDays}
    Revision days per cycle: ${this.formData.revDays}
    Rest days per cycle: ${this.formData.restDays}
    Start Date: ${this.formData.startDate}
  `.trim();
  }

  generatePreview() {
    console.log('generating preview');
  }
}
