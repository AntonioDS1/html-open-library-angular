import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-description.component.html',
  styleUrl: './book-description.component.scss'
})
export class BookDescriptionComponent {
  @Input() description?: string | null;
}
