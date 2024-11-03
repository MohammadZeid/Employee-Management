import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../services/apicaller.service';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css'],
})
export class EmployeeDetailsModalComponent {
  @Input() isOpen = false;
  @Input() employee: Employee | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  getRatingClass(rating: number): string {
    if (rating >= 4) return 'bg-success';
    if (rating >= 3) return 'bg-warning';
    return 'bg-danger';
  }
}
