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

  formData = {
    'memorizationUnit': UnitType.Thomn,
    'startUnit': 'H1T1',
    'endUnit': 'H15T8',
    'memorizationDaysPerCycle': 2,
    'revisionDaysPerCycle': 2,
    'restDaysPerCycle': 1,
    'startDate': '2025-06-11',
  };

  steps = ['memorizationUnit', 'startUnit', 'endUnit', 'memorizationDaysPerCycle', 'revisionDaysPerCycle', 'restDaysPerCycle', 'startDate', 'preview'];

  stepDescriptions: { [key: string]: string } = {
    'memorizationUnit': 'how much do you want to memorize per day?',
    'startUnit': 'Where do you want to start memorizing from?',
    'endUnit': 'Where do you want to end?',
    'memorizationDaysPerCycle': 'How many days do you want to memorize per cycle?',
    'revisionDaysPerCycle': 'How many days do you want to revise per cycle?',
    'restDaysPerCycle': 'How many days do you want to rest per cycle?',
    'startDate': 'When Do you want to start your trip?',
    'preview': 'Done! Now you can generate a preview of your plan!',
  };

  inputJson = {};
  currentStepNumber = 1
  currentStep = this.steps[this.currentStepNumber - 1];
  currentStepDescription = this.stepDescriptions[this.currentStep];

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
    Memorization Unit: ${UnitType[this.formData.memorizationUnit]}
    Start from: ${this.formData.startUnit}
    End at: ${this.formData.endUnit}
    Memorization days per cycle: ${this.formData.memorizationDaysPerCycle}
    Revision days per cycle: ${this.formData.revisionDaysPerCycle}
    Rest days per cycle: ${this.formData.restDaysPerCycle}
    Start Date: ${this.formData.startDate}
  `.trim();
  }

  generatePreview() {
    this.inputJson = {
      'memorizationUnit': UnitType[this.formData.memorizationUnit],
      'startUnit': this.formData.startUnit,
      'endUnit': this.formData.endUnit,
      'memorizationDaysPerCycle': this.formData.memorizationDaysPerCycle,
      'revisionDaysPerCycle': this.formData.revisionDaysPerCycle,
      'restDaysPerCycle': this.formData.restDaysPerCycle,
      'startDate': this.formData.startDate
    };
    console.log(this.inputJson)
  }
}
