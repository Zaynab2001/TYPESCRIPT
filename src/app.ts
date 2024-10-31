import express, { Request, Response } from 'express';
import path from 'path';
import { addBook, getBooks } from './bookService';

const app = express();
const port = 3000;

// Middleware pour analyser le JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route pour ajouter un livre
app.post('/addBook', async (req: Request, res: Response) => {
    try {
        const result = await addBook(req.body);
        res.status(201).json(result);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});

// Route pour obtenir la liste des livres
app.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
