import { Injectable, inject, signal } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { OpenLibraryService } from '../../../core/services/open-library.service';

@Injectable({ providedIn: 'root' })
export class BooksFacadeService {

  private openLibrary = inject(OpenLibraryService);

  // =====================================================
  // STATO INTERNO (SIGNALS)
  // =====================================================

  private _books = signal<Book[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _hasSearched = signal(false);

  // cache descrizioni
  private descriptionCache = new Map<string, string>();

  // =====================================================
  // STATO PUBBLICO (READONLY SIGNALS)
  // =====================================================

  readonly books = this._books.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly hasSearched = this._hasSearched.asReadonly();

  // =====================================================
  // SEARCH
  // =====================================================

  search(category: string): void {

    this._hasSearched.set(true);
    this._loading.set(true);
    this._error.set(null);

    this.openLibrary.searchBySubject(category).subscribe({
      next: (books) => {
        this._books.set(books);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Errore nel caricamento.');
        this._loading.set(false);
      }
    });
  }

  // =====================================================
  // TOGGLE DESCRIPTION
  // =====================================================

  toggleDescription(book: Book): void {

    const currentBooks = this._books();
    const target = currentBooks.find(b => b.key === book.key);
    if (!target) return;


    if (target.description) {
      target.showDescription = !target.showDescription;
      this._books.set([...currentBooks]);
      return;
    }


    if (this.descriptionCache.has(target.key)) {
      target.description = this.descriptionCache.get(target.key) ?? '';
      target.showDescription = true;
      this._books.set([...currentBooks]);
      return;
    }


    this.openLibrary.getWorkDetail(target.key).subscribe({
      next: (detail) => {
        const description = this.extractDescription(detail);

        target.description = description;
        target.showDescription = true;

        this.descriptionCache.set(target.key, description);

        this._books.set([...currentBooks]);
      },
      error: () => {
        target.description = 'Errore nel caricamento della descrizione.';
        target.showDescription = true;
        this._books.set([...currentBooks]);
      }
    });
  }

  private extractDescription(detail: any): string {
    if (!detail?.description) return 'Descrizione non disponibile.';
    if (typeof detail.description === 'string') return detail.description;
    if (detail.description?.value) return detail.description.value;
    return 'Descrizione non disponibile.';
  }
}
