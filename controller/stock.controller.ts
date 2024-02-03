import { Request, Response } from 'express';
import { StockModel } from '../model/stock.model';

export class StockController {
    static async getStocks(req: Request, res: Response) {
        try {
            const result = StockModel.getAllStocks();
            if (result === undefined) {
                throw new Error("No stocks found");
            }
            res.send(await result.toArray());
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}