"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
async function createConnection() {
    const connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'book_tracker'
    });
    return connection;
}
exports.default = createConnection;
