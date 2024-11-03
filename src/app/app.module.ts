import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { EmployeesComponent } from './employees/employees.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { UpdateComponentComponent } from './components/update-component/update-component.component';
import { HeaderComponent } from './header/header.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsModalComponent } from './employee-details-modal/employee-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    EmployeesComponent,
    SearchComponent,
    AddEmployeeComponent,
    UpdateComponentComponent,
    HeaderComponent,
    EmployeeDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
