import express from 'express';

const PORT = 3000;
const app = express();
import MainRouter from './routes/routes';
import {startStockUpdater} from './helpers/stock.helper';

app.use('/', MainRouter);

app.use(express.static('public'));

const stockUpdater = startStockUpdater(1000);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});