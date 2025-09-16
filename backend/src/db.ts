// src/db.ts

// Ignora erro de falta de declaração de tipos do better-sqlite3
// @ts-ignore
import Database = require('better-sqlite3');
import path = require('path');

// Caminho do banco
const dbPath = path.join(__dirname, 'gift-app.db');

// Instância do banco
const dbInstance = new Database(dbPath);

// Criação das tabelas
dbInstance.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_picture TEXT,
    bio TEXT
  )
`).run();

dbInstance.prepare(`
  CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    product_link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`).run();

// Exporta função getter para evitar problemas de TS4023
export const getDB = (): any => dbInstance;