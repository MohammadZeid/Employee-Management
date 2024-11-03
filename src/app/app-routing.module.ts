import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateComponentComponent } from './components/update-component/update-component.component';
const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'updateEmployee/:id', component: UpdateComponentComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
