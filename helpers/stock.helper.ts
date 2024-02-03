import { StockModel } from "../model/stock.model";

//? Debug function to get all stocks and print them to the console
async function getStocks() {
    const stocks = StockModel.getAllStocks();
    if (stocks === undefined) {
        throw new Error("No stocks found");
    }
    console.log(await stocks.toArray());
}

/**
 * Creats a interval to update stock values. Should only be called once
 * @param updateInterval Interval in ms
 */
export async function startStockUpdater(updateInterval: number) {
    setInterval(async () => {
        await updateStocks();
        await getStocks();
    }, updateInterval);
}

/**
 * Updates all stocks in the database randomly
 */
async function updateStocks() {
    const stocks = StockModel.getAllStocks();

    if (stocks === undefined) {
        throw new Error("No stocks found");
    }

    for await (const stock of stocks) {
        await StockModel.updateStock(stock._id, calcStockChange(stock.value), stock.value);
    }
}


/**
 * Diviates the stock value randomly

 * @param stockValue Current Stock value
 * @returns New stock value   
 */
function calcStockChange(stockValue: number): number {
    const rand = Math.random();
    let newStock = 0;

    if (rand > 0.5) {
        newStock = stockValue + Math.floor(Math.random() * 100);
    } else {
        newStock = stockValue - Math.floor(Math.random() * 100);
    }

    if (newStock <= 0) {
        newStock = 0;
    }

    return newStock;
}