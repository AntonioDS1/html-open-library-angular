import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {

  @Output() search = new EventEmitter<string>();

  category = '';

  onSubmit(): void {
    const value = this.category.trim();
    if (!value) return;

    this.search.emit(value);
  }
}
