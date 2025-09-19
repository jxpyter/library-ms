// books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }
    return book;
  }

  create(data: Omit<Book, 'id'>): Book {
    const newBook: Book = { id: this.idCounter++, ...data };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, data: Partial<Book>): Book {
    const idx = this.books.findIndex((b) => b.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Book with id ${idx} not found.`);
    }
    this.books[idx] = { ...this.books[idx], ...data };
    return this.books[idx];
  }

  remove(id: number): boolean {
    const idx = this.books.findIndex((b) => b.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(idx, 1);
    return true;
  }
}
