import { Router } from "express";
import UserRouter from "./user.route";
import StockRouter from "./stock.route";
const MainRouter = Router();

MainRouter.use("/user", UserRouter);
MainRouter.use("/stock", StockRouter);
MainRouter.get("/", (req, res) => {
    res.send("Hello! This is the Transact.io API. Please refer to the documentation for more information.");
})

export default MainRouter;