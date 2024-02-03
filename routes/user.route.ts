import { Router } from 'express';
import dbInstance  from '../db/dbHandler';
import { Table } from '../enum/enums';

const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
    const result = await dbInstance.find(Table.USER, {});
    res.send(result);
});

export default UserRouter
