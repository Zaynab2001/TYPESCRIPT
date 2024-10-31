"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bookService_1 = require("./bookService");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.post('/addBook', async (req, res) => {
    try {
        const result = await (0, bookService_1.addBook)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});
app.get('/books', async (req, res) => {
    try {
        const books = await (0, bookService_1.getBooks)();
        res.json(books);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});
app.put('/updateBook/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await (0, bookService_1.updateBook)(id, req.body);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'Livre non trouvé.' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});
app.delete('/deleteBook/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await (0, bookService_1.deleteBook)(id);
        if (result) {
            res.status(200).json({ message: 'Livre supprimé avec succès.' });
        }
        else {
            res.status(404).json({ message: 'Livre non trouvé.' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
