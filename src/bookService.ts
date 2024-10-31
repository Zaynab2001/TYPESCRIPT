import createConnection from './database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Book } from './Book';

// Ajouter un livre
export const addBook = async (book: Book): Promise<ResultSetHeader> => {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO books (title, author, pages, pagesRead, status, format, suggestedBy, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price]
        );
        return result;
    } finally {
        connection.end();
    }
};

// Obtenir tous les livres
export const getBooks = async (): Promise<Book[]> => {
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM books');
        return rows as Book[];
    } finally {
        connection.end();
    }
};

// Mettre à jour un livre
export const updateBook = async (id: number, book: Book): Promise<ResultSetHeader | null> => {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE books SET title = ?, author = ?, pages = ?, pagesRead = ?, status = ?, format = ?, suggestedBy = ?, price = ? WHERE id = ?',
            [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price, id]
        );
        return result.affectedRows > 0 ? result : null; // Return null if no rows were affected
    } finally {
        connection.end();
    }
};

// Supprimer un livre
export const deleteBook = async (id: number): Promise<boolean> => {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows > 0; // Return true if a row was deleted
    } finally {
        connection.end();
    }
};

// Obtenir un livre par ID
export const getBookById = async (id: number): Promise<Book | null> => {
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
        return rows.length > 0 ? (rows[0] as Book) : null; // Return null if no book found
    } finally {
        connection.end();
    }
};
