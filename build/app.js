"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./index"));
const clientes_1 = __importDefault(require("./routes/clientes"));
const entrenadores_1 = __importDefault(require("./routes/entrenadores"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const allowedOrigins = ['192.168.0.123:3000', 'https://titaniumgym.azurewebsites.net'];
const options = {
    origin: allowedOrigins
};
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(options));
    }
    routes() {
        this.app.use(index_1.default);
        this.app.use('/api-ux-gestion-de-personas/servicio-de-clientes/v1/clientes', clientes_1.default);
        this.app.use('/api-ux-gestion-de-personas/servicio-de-entrenadores/v1/entrenadores', entrenadores_1.default);
        this.app.use('/api-ux-gestion-de-personas/servicio-de-usuarios/v1/usuarios', usuarios_1.default);
    }
    async listen() {
        await this.app.listen(this.port);
        console.log(`┬íServidor conectado al puerto ${this.port}!`);
    }
}
exports.App = App;
