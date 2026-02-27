import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { inject } from '@angular/core';

import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { BooksListComponent } from '../../components/books-list/books-list.component';

import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

import { BooksFacadeService } from '../../services/books-facade.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, BooksListComponent, LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  private facade = inject(BooksFacadeService);

  // Espone gli Observable della facade
  books = this.facade.books;
  loading = this.facade.loading;
  error = this.facade.error;
  hasSearched = this.facade.hasSearched;



  // Quando l’utente cerca
  onSearch(category: string): void {
    this.facade.search(category);
  }

  // Quando l’utente clicca "Vedi descrizione"
  toggleDescription(book: Book): void {
    this.facade.toggleDescription(book);
  }
}
