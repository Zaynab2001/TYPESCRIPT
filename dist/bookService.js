"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookById = exports.deleteBook = exports.updateBook = exports.getBooks = exports.addBook = void 0;
const database_1 = __importDefault(require("./database"));
const addBook = async (book) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('INSERT INTO books (title, author, pages, pagesRead, status, format, suggestedBy, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price]);
        return result;
    }
    finally {
        connection.end();
    }
};
exports.addBook = addBook;
const getBooks = async () => {
    const connection = await (0, database_1.default)();
    try {
        const [rows] = await connection.execute('SELECT * FROM books');
        return rows;
    }
    finally {
        connection.end();
    }
};
exports.getBooks = getBooks;
const updateBook = async (id, book) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('UPDATE books SET title = ?, author = ?, pages = ?, pagesRead = ?, status = ?, format = ?, suggestedBy = ?, price = ? WHERE id = ?', [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price, id]);
        return result.affectedRows > 0 ? result : null;
    }
    finally {
        connection.end();
    }
};
exports.updateBook = updateBook;
const deleteBook = async (id) => {
    const connection = await (0, database_1.default)();
    try {
        const [result] = await connection.execute('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    finally {
        connection.end();
    }
};
exports.deleteBook = deleteBook;
const getBookById = async (id) => {
    const connection = await (0, database_1.default)();
    try {
        const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    finally {
        connection.end();
    }
};
exports.getBookById = getBookById;
