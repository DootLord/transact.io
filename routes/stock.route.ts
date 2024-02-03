import { Router } from 'express';
import { StockController } from '../controller/stock.controller';

const StockRouter = Router();

StockRouter.get("/", async (req, res) => StockController.getStocks(req, res));

export default StockRouter
