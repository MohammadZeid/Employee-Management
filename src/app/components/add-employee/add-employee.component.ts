import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from 'src/app/services/apicaller.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  True: boolean = false;
  message: string = '';
  constructor(
    private EmployeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  AddStudent() {
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.position ||
      !this.employee.department ||
      !this.employee.rating
    ) {
      this.True = true;
      this.message = 'Please enter full credentials';
      setTimeout(() => {
        this.message = '';
      }, 1000);
    } else {
      this.True = false;
      this.EmployeeService.addEmployee(this.employee).subscribe({});
      this.message = 'Employee Added Successfully';
      setTimeout(() => {
        this.message = '';
        this.router.navigate(['/']);
      }, 2000);
    }
  }
}
