// Dependencies
import { readFileSync, openSync, closeSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';

// Configuration
const srcPath = 'data/LukesWife.html'; // Adjust the path to your HTML file
const dstPath = 'docs/generated-schema.sql';

// Functions
const extractBooksAndChapters = (root) => {
  const books = [];
  const chapters = [];

  // Extract books and chapters
  const bookElements = root.querySelectorAll('.book');
  bookElements.forEach((bookElement) => {
    const bookTitle = bookElement.querySelector('.book-title').text;
    const chaptersElement = bookElement.querySelector('.chapters');
    const chapterElements = chaptersElement.querySelectorAll('.chapter');

    books.push({ title: bookTitle });

    chapterElements.forEach((chapterElement) => {
      const chapterTitle = chapterElement.querySelector('.chapter-title').text;
      const chapterContent = chapterElement.querySelector('.chapter-content').text;

      chapters.push({
        bookTitle,
        title: chapterTitle,
        content: chapterContent,
      });
    });
  });

  return { books, chapters };
};

// Create SQL schema
const createSQLSchema = (fd) => {
  writeFileSync(fd, 'DROP TABLE IF EXISTS chapters CASCADE;\n');
  writeFileSync(fd, 'DROP TABLE IF EXISTS books CASCADE;\n\n');

  writeFileSync(fd, '-- Create the "books" table\n');
  writeFileSync(fd, 'CREATE TABLE books (\n');
  writeFileSync(fd, '  id SERIAL PRIMARY KEY,\n');
  writeFileSync(fd, '  title TEXT NOT NULL\n');
  writeFileSync(fd, ');\n\n');

  writeFileSync(fd, '-- Create the "chapters" table\n');
  writeFileSync(fd, 'CREATE TABLE chapters (\n');
  writeFileSync(fd, '  id SERIAL PRIMARY KEY,\n');
  writeFileSync(fd, '  title TEXT NOT NULL,\n');
  writeFileSync(fd, '  book_title TEXT NOT NULL,\n');
  writeFileSync(fd, '  content TEXT NOT NULL\n');
  writeFileSync(fd, ');\n\n');
};

// Insert data into the tables
const insertData = (fd, tableName, columns, values) => {
  values.forEach((value) => {
    const valueString = columns.map((column) => `'${value[column]}'`).join(', ');
    writeFileSync(fd, `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES (${valueString});\n`);
  });
};

// Conversion
try {
  const src = readFileSync(srcPath, 'utf8');
  const domRoot = parse(src);

  // Extract book and chapter data
  const { books, chapters } = extractBooksAndChapters(domRoot);

  // Output the data as SQL
  const fd = openSync(dstPath, 'w');

  // Create SQL schema
  createSQLSchema(fd);

  // Insert book data
  insertData(fd, 'Books', ['title'], books);

  // Insert chapter data
  insertData(fd, 'Chapters', ['title', 'bookTitle', 'content'], chapters);

  closeSync(fd);
} catch (error) {
  console.error('An error occurred:', error);
}
