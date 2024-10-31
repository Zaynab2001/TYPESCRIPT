"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.addBook = void 0;
const database_1 = __importDefault(require("./database"));
const addBook = async (book) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('INSERT INTO books (title, author, pages, pagesRead, status, format, suggestedBy, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price]);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error adding book:', error.message);
            throw new Error('Error adding book: ' + error.message);
        }
        else {
            console.error('Unknown error adding book:', error);
            throw new Error('Error adding book: Unknown error');
        }
    }
    finally {
        await connection.end();
    }
};
exports.addBook = addBook;
const getBooks = async () => {
    const connection = await (0, database_1.default)();
    try {
        const [rows] = await connection.execute('SELECT * FROM books');
        return rows;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error retrieving books:', error.message);
            throw new Error('Error retrieving books: ' + error.message);
        }
        else {
            console.error('Unknown error retrieving books:', error);
            throw new Error('Error retrieving books: Unknown error');
        }
    }
    finally {
        await connection.end();
    }
};
exports.getBooks = getBooks;
const getBookById = async (id) => {
    const connection = await (0, database_1.default)();
    try {
        const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error retrieving book:', error.message);
            throw new Error('Error retrieving book: ' + error.message);
        }
        else {
            console.error('Unknown error retrieving book:', error);
            throw new Error('Error retrieving book: Unknown error');
        }
    }
    finally {
        await connection.end();
    }
};
exports.getBookById = getBookById;
const updateBook = async (id, book) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('UPDATE books SET title = ?, author = ?, pages = ?, pagesRead = ?, status = ?, format = ?, suggestedBy = ?, price = ? WHERE id = ?', [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price, id]);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating book:', error.message);
            throw new Error('Error updating book: ' + error.message);
        }
        else {
            console.error('Unknown error updating book:', error);
            throw new Error('Error updating book: Unknown error');
        }
    }
    finally {
        await connection.end();
    }
};
exports.updateBook = updateBook;
const deleteBook = async (id) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('DELETE FROM books WHERE id = ?', [id]);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting book:', error.message);
            throw new Error('Error deleting book: ' + error.message);
        }
        else {
            console.error('Unknown error deleting book:', error);
            throw new Error('Error deleting book: Unknown error');
        }
    }
    finally {
        await connection.end();
    }
};
exports.deleteBook = deleteBook;
