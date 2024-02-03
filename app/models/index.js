import { DB, USER, PASSWORD, HOST, dialect as _dialect, port as _port, pool as _pool } from "../config/db.config.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: _dialect,
    port: _port,
    operatorsAliases: false,

    pool: {
        max: _pool.max,
        min: _pool.min,
        acquire: _pool.acquire,
        idle: _pool.idle
    }
});