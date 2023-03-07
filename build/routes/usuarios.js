"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const usuariosServicio_1 = require("../services/usuariosServicio");
const router = express_1.default.Router();
router.route('/')
    .get(usuariosServicio_1.getAllEntries)
    .post(usuariosServicio_1.addEntry);
router.route('/:id')
    .get(usuariosServicio_1.getIdEntry)
    .delete(usuariosServicio_1.deleteIdEntry)
    .put(usuariosServicio_1.updateIdEntry);
exports.default = router;
