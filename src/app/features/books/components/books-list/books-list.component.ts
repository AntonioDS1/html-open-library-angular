import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../core/models/book.model';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  @Input() books: Book[] = [];
  @Output() toggleDescription = new EventEmitter<Book>();
}
