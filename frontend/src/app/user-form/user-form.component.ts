import { Component } from '@angular/core';
import { GptService } from '../services/gpt.service';

enum UnitType { Thomn = 0, Page = 1 }

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

export class UserFormComponent {
  constructor(private gptService: GptService) { }

  unitTypeOptions = [
    { label: 'Thomn', value: UnitType.Thomn },
    { label: 'Page', value: UnitType.Page }
  ];

  formData = {
    'memorizationUnit': UnitType.Thomn,
    'startUnit': 'H1T1',
    'endUnit': 'H1T8',
    'memorizationDaysPerCycle': 2,
    'revisionDaysPerCycle': 2,
    'restDaysPerCycle': 1,
    'startDate': '2025-06-11',
  };

  steps = ['memorizationUnit', 'startUnit', 'endUnit', 'memorizationDaysPerCycle', 'revisionDaysPerCycle', 'restDaysPerCycle', 'startDate', 'previewPlan', 'fullPlan', 'download'];

  stepDescriptions: { [key: string]: string } = {
    'memorizationUnit': 'How much do you want to memorize per day?',
    'startUnit': 'Where do you want to start memorizing from?',
    'endUnit': 'Where do you want to end?',
    'memorizationDaysPerCycle': 'How many days do you want to memorize per cycle?',
    'revisionDaysPerCycle': 'How many days do you want to revise per cycle?',
    'restDaysPerCycle': 'How many days do you want to rest per cycle?',
    'startDate': 'When Do you want to start your trip?',
    'previewPlan': 'Done! Now you can generate a preview of your plan!',
    'fullPlan': 'Here is a preview of your plan! If you like it you can now generate the full plan',
    'download': 'Congratulations! Your plan is ready to download! Happy Memorization!',
  };

  csvHeaders: string[] = [];
  previewPlanRows: string[][] = [];
  fullPlanRows: string[][] = [];

  estimatedCompletionDate: string = '';
  isPreviewPlanReady: boolean = false
  isFullPlanReady: boolean = false

  inputJson = {};
  formattedUserInput = {};

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

  getFormattedInputJson() {
    return {
      'memorizationUnit': UnitType[this.formData.memorizationUnit],
      'startUnit': this.formData.startUnit,
      'endUnit': this.formData.endUnit,
      'memorizationDaysPerCycle': this.formData.memorizationDaysPerCycle,
      'revisionDaysPerCycle': this.formData.revisionDaysPerCycle,
      'restDaysPerCycle': this.formData.restDaysPerCycle,
      'startDate': this.formData.startDate
    };
  }

  private parsePlanCSV(csvText: string): void {
    const rows: string[] = csvText.trim().split('\n');
    this.csvHeaders = rows.shift()!.split(',');

    this.previewPlanRows = rows.map((row: string) =>
      row.split(',').map((cell: string) => cell.trim())
    );
    console.log(this.previewPlanRows);
  }

  generatePreviewPlan(): void {
    this.isPreviewPlanReady = false;
    this.goToNextStep();
    this.formattedUserInput = this.getFormattedInputJson();

    this.gptService.generatePreviewPlan(this.formattedUserInput).subscribe({
      next: (response: any) => {
        this.estimatedCompletionDate = response.estimatedCompletionDate;
        this.parsePlanCSV(response.previewCSV);
        this.isPreviewPlanReady = true;
      },
      error: (err: any) => {
        console.error('Error getting preview:', err);
      }
    });
  }

  generateFullPlan() {
    this.isFullPlanReady = false;
    this.goToNextStep();
    this.gptService.generateFullPlan(this.formattedUserInput).subscribe({
      next: (response: any) => {
        this.parsePlanCSV(response.planCSV);
        this.isFullPlanReady = true;
      },
      error: (err: any) => {
        console.error('Error getting full plan:', err);
      }
    });
  }

  downlaodFullPlan() {
    console.log('downlaoding Full Plan');
  }
}
