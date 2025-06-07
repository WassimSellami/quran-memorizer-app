import { Component } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  constructor() {
    var currentStep = 0;
    const steps = ['unit', 'startUnit', 'endUnit', 'cycle', 'ratio', 'rest', 'startDate']
  }
}
