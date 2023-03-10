"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const clientesServicio_1 = require("../services/clientesServicio");
const router = express_1.default.Router();
router.route('/')
    .get(clientesServicio_1.getAllEntries)
    .post(clientesServicio_1.addEntry);
router.route('/:id')
    .get(clientesServicio_1.getDNIEntry)
    .delete(clientesServicio_1.deleteIdEntry)
    .put(clientesServicio_1.updateIdEntry);
exports.default = router;
