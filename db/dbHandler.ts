/**
* This file handles the db object and exports it as a singleton
*/
import db from './db';

let dbInstance = new db();

if (!dbInstance) {
    dbInstance = new db();
}

export default dbInstance as db;

