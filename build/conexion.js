"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
// import fs from 'fs'
// const serverCA = [fs.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8')]
async function connect() {
    const connection = (0, promise_1.createPool)({
        host: 'mysql-titaniumgym-prod-001.mysql.database.azure.com',
        user: 'TitaniumBD',
        password: 'AdminMySQL1',
        database: 'gimnasio',
        port: 3306
        /*
        ssl: {
          rejectUnauthorized: true,
          ca: serverCA
        }
        */
    });
    return connection;
}
exports.connect = connect;
