import { MongoClient, Db } from "mongodb";
import { Table } from "./enums";
const connectionString = "mongodb://172.17.0.4:27017";


/**
 * Class to manage database connections and operations
 */
class Database {
    private client: MongoClient;
    private db: Db | undefined;

    constructor() {
        this.client = new MongoClient(connectionString);
        this.db = undefined;
        this.connectDB();
    }

    async connectDB() {
        console.log("connecting to db");
        try {
            await this.client.connect();
            this.db = this.client.db("transactio");
        } catch (e) {
            console.error(e);
            throw new Error("Could not connect to database");
        }
    }

    async closeDB() {
        try {
            await this.client.close();
        } catch (e) {
            console.error(e);
        }
    }

    findOne(collection: Table, query: Object) {
        let collectionConn = this.verifyConnection(collection);
        try {
            const result = collectionConn.findOne(query);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    find(collection: Table, query: Object) {
        let collectionConn = this.verifyConnection(collection);
        try {
            const result = collectionConn.find(query);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    update(collection: Table, query: Object, update: Object) {
        let collectionConn = this.verifyConnection(collection);
        try {
            const result = collectionConn.updateOne(query, update);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    updateMany(collection: Table, query: Object, update: Object) {
        let collectionConn = this.verifyConnection(collection);
        try {
            const result = collectionConn.updateMany(query, update);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    private verifyConnection(collection: Table) {
        if (!this.db || this.db === undefined) {
            throw new Error("No database found!");
        }
        const thisCollection = this.db.collection(collection);
        if (!thisCollection) {
            throw new Error(`Collection ${collection} not found`);
        }

        return thisCollection
    }
}

export default Database;