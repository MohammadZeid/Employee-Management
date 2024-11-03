import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from 'src/app/services/apicaller.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  Employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  selectedEmployee: Employee | null = null;
  showModal: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.Employees = data;
        this.filteredEmployees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      },
    });
  }

  onSearchChange() {
    this.filteredEmployees = this.Employees.filter(
      (employee) =>
        employee.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }

  openEmployeeDetails(employee: Employee) {
    console.log(employee);
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  closeModal() {
    this.selectedEmployee = null;
    this.showModal = false;
  }

  deleteEmployee(employee: Employee) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employee).subscribe({
        next: () => {
          this.Employees = this.Employees.filter(
            (emp) => emp.id !== employee.id
          );
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        },
      });
    }
  }
  // Method to handle search event from SearchComponent
  displayEmployee(searchTerm: string) {
    this.searchText = searchTerm;
    this.onSearchChange();
  }
}
