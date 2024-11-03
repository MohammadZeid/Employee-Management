import { Component } from '@angular/core';
import { EmployeeService } from './services/apicaller.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Employees Management system';
  constructor(private EmployeeService: EmployeeService) {}
}
