import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import * as booksService from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly service: booksService.BooksService) {}

  @Get()
  findAll(): booksService.Book[] {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): booksService.Book {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Omit<booksService.Book, 'id'>): booksService.Book {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<booksService.Book>,
  ): booksService.Book {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.service.remove(Number(id));
  }
}
