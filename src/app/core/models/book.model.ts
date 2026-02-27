export interface Author {
  name: string;
}

export interface Book {
  cover: string;
  key: string;
  title: string;
  authors?: Author[];

  // proprietà UI
  description?: string;
  showDescription?: boolean;
}
