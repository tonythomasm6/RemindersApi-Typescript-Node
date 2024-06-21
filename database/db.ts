import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';

let db:Database;
export async function initializeDatabase() {
    try {
         db = await open({
            filename: './data/reminders.db',
            driver: sqlite3.Database
        });

        await db.exec(`CREATE TABLE IF NOT EXISTS reminders (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title TEXT NOT NULL,
                            isCompleted BOOLEAN NOT NULL

        )`)
        return db;
    }catch (error) {
        console.error('Error initialize database ',error);
        return null;
    }
}

export function getDatabase(): Database{
    if (!db) {
        throw new Error('Database not initialized')
    }else {
        return db;
    }
}
