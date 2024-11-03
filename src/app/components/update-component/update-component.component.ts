import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from 'src/app/services/apicaller.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css'],
})
export class UpdateComponentComponent implements OnInit {
  employee: Employee = new Employee();
  id!: Number;
  message: string = '';
  showError: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  getEmployeeInfo(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.employeeService.getSingleEmployee(this.id).subscribe((employee) => {
        if (employee) {
          this.employee.id = this.id;
          this.employee.firstName = employee.firstName;
          this.employee.lastName = employee.lastName;
          this.employee.department = employee.department;
          this.employee.position = employee.position;
          this.employee.rating = employee.rating;
        } else {
          this.showError = true;
          this.message = 'Employee not found';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
    });
  }

  updateEmployee(): void {
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.department ||
      !this.employee.position ||
      this.employee.rating === undefined ||
      this.employee.rating < 0
    ) {
      this.showError = true;
      this.message = 'Please enter all required fields correctly';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    } else {
      this.showError = false;
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: () => {
          this.message = 'Employee Updated Successfully';
          setTimeout(() => {
            this.message = '';
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.showError = true;
          this.message = 'Error updating employee: ' + error.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
      });
    }
  }
}
