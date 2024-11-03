import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

export class RatingHistory {
  date: string = '';
  rating: number = 0;
  comment?: string = '';
}
export class Employee {
  id?: Number;
  firstName: string = '';
  lastName: string = '';
  department: string = '';
  position: string = '';
  rating: number = 0;
  ratingHistory?: RatingHistory[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';
  update: boolean = false;
  private subject = new Subject<any>();

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialEmployees: Employee[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          department: 'Engineering',
          position: 'Senior Developer',
          rating: 3,
          ratingHistory: [
            {
              date: new Date().toISOString().split('T')[0],
              rating: 3,
              comment: 'Goof work',
            },
            {
              date: new Date().toISOString().split('T')[0],
              rating: 5,
              comment: 'Excellent !!',
            },
          ],
        },
        {
          id: 2,
          firstName: 'Mohamad',
          lastName: 'Zeid',
          department: 'Engineering',
          position: 'Software engineer',
          rating: 4.8,
          ratingHistory: [
            {
              date: new Date().toISOString().split('T')[0],
              rating: 4,
              comment: 'good work',
            },
            {
              date: new Date().toISOString().split('T')[0],
              rating: 4.8,
              comment: 'Amzing work',
            },
          ],
        },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialEmployees));
    }
  }

  private getEmployeesFromStorage(): Employee[] {
    const employees = localStorage.getItem(this.STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  }

  private saveEmployeesToStorage(employees: Employee[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }

  getAllEmployees(): Observable<Employee[]> {
    const employees = this.getEmployeesFromStorage();
    return of(employees);
  }

  getSingleEmployee(id: Number): Observable<Employee | undefined> {
    const employees = this.getEmployeesFromStorage();
    const employee = employees.find((emp) => emp.id == id);
    return of(employee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const employees = this.getEmployeesFromStorage();
    // Generate new ID (max + 1)
    const maxId = Math.max(...employees.map((emp) => Number(emp.id) || 0), 0);
    const newEmployee = { ...employee, id: maxId + 1 };

    employees.push(newEmployee);
    this.saveEmployeesToStorage(employees);
    return of(newEmployee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const employees = this.getEmployeesFromStorage();
    const index = employees.findIndex((emp) => emp.id == employee.id);

    if (index !== -1) {
      employees[index] = employee;
      this.saveEmployeesToStorage(employees);
      return of(employee);
    }

    throw new Error('Employee not found');
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const employees = this.getEmployeesFromStorage();
    const filteredEmployees = employees.filter((emp) => emp.id !== employee.id);

    if (employees.length !== filteredEmployees.length) {
      this.saveEmployeesToStorage(filteredEmployees);
      return of(employee);
    }

    throw new Error('Employee not found');
  }

  toggleUpdateEmployee(): void {
    this.update = !this.update;
    this.subject.next(this.update);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
