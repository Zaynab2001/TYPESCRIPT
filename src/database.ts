import mysql from 'mysql2/promise';

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // Remplacez par votre nom d'utilisateur
        password: '', // Remplacez par votre mot de passe
        database: 'book_tracker'
    });
    return connection; // Retourne la connexion active
}

export default createConnection;
