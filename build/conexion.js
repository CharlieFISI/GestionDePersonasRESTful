"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
// import fs from 'fs'
// const serverCA = [fs.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8')]
async function connect() {
    const connection = (0, promise_1.createPool)({
        host: 'containers-us-west-127.railway.app',
        user: 'root',
        password: 'yqz3OYH3P8Va5jdFcmNw',
        database: 'gimnasio',
        port: 6435
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
