import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Book } from '../models/book.model';
import { BookDetail } from '../models/book-detail.model';

type SubjectApiResponse = {
  works: any[];
};

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  private readonly baseUrl = 'https://openlibrary.org';

  private http = inject(HttpClient);

  searchBySubject(category: string): Observable<Book[]> {

    const safe = encodeURIComponent(category.trim().toLowerCase());

    return this.http
      .get<SubjectApiResponse>(`${this.baseUrl}/subjects/${safe}.json`)
      .pipe(
        map(res => {
          const works = res?.works ?? [];

          return works.map(work => ({

            cover: work.cover_id
              ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`
              : 'https://placehold.co/300x450?text=No+Cover',

            key: work.key,
            title: work.title,
            authors: (work.authors ?? []).map((a: any) => ({
              name: a.name
            }))
          }));
        })
      );
  }

  getWorkDetail(workKey: string): Observable<BookDetail> {
    return this.http.get<BookDetail>(`${this.baseUrl}${workKey}.json`);
  }
}
