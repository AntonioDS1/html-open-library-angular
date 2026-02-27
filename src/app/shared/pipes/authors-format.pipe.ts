import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../../core/models/book.model';

@Pipe({
  name: 'authorsFormat',
  standalone: true
})
export class AuthorsFormatPipe implements PipeTransform {
  transform(authors?: Author[] | null): string {
    if (!authors?.length) return 'Autori non disponibili';
    return authors.map(a => a.name).join(', ');
  }
}
