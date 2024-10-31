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
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error adding book:', error.message);
            throw new Error('Error adding book: ' + error.message);
        } else {
            console.error('Unknown error adding book:', error);
            throw new Error('Error adding book: Unknown error');
        }
    } finally {
        await connection.end();
    }
};

// Récupérer tous les livres
export const getBooks = async (): Promise<Book[]> => {
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute<Book[] & RowDataPacket[]>('SELECT * FROM books');
        return rows;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error retrieving books:', error.message);
            throw new Error('Error retrieving books: ' + error.message);
        } else {
            console.error('Unknown error retrieving books:', error);
            throw new Error('Error retrieving books: Unknown error');
        }
    } finally {
        await connection.end();
    }
};

// Récupérer un livre par ID
export const getBookById = async (id: number): Promise<Book | null> => {
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute<Book[] & RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error retrieving book:', error.message);
            throw new Error('Error retrieving book: ' + error.message);
        } else {
            console.error('Unknown error retrieving book:', error);
            throw new Error('Error retrieving book: Unknown error');
        }
    } finally {
        await connection.end();
    }
};

// Mettre à jour un livre
export const updateBook = async (id: number, book: Book): Promise<ResultSetHeader> => {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE books SET title = ?, author = ?, pages = ?, pagesRead = ?, status = ?, format = ?, suggestedBy = ?, price = ? WHERE id = ?',
            [book.title, book.author, book.pages, book.pagesRead, book.status, book.format, book.suggestedBy, book.price, id]
        );
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error updating book:', error.message);
            throw new Error('Error updating book: ' + error.message);
        } else {
            console.error('Unknown error updating book:', error);
            throw new Error('Error updating book: Unknown error');
        }
    } finally {
        await connection.end();
    }
};

// Supprimer un livre
export const deleteBook = async (id: number): Promise<ResultSetHeader> => {
    const connection = await createConnection();
    try {
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM books WHERE id = ?', [id]);
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting book:', error.message);
            throw new Error('Error deleting book: ' + error.message);
        } else {
            console.error('Unknown error deleting book:', error);
            throw new Error('Error deleting book: Unknown error');
        }
    } finally {
        await connection.end();
    }
};
