import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../core/models/book.model';
import { AuthorsFormatPipe } from '../../../../shared/pipes/authors-format.pipe';
import { BookDescriptionComponent } from '../book-description/book-description.component';


@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, AuthorsFormatPipe, BookDescriptionComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Output() toggleDescription = new EventEmitter<Book>();
}
