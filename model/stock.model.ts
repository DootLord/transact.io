import { FindCursor, WithId, Document, ObjectId } from "mongodb";
import dbInstance from "../db/dbHandler";
import { Table } from "../enum/enums";

export class StockModel {
    static getAllStocks(): FindCursor<WithId<Document>> {
        const allStocks = dbInstance.find(Table.STOCK, {});

        if (allStocks === undefined) {
            throw new Error("No stocks found");
        }

        return allStocks;
    }

    static updateStock(stockId: ObjectId, newPrice: number, oldPrice: number) {
        return dbInstance.update(Table.STOCK, { _id: stockId }, {
            $set: { "value": newPrice },
            $push: {
                "history": {
                    $each: [oldPrice],
                    $slice: -10
                },
            }
        });
    }
}