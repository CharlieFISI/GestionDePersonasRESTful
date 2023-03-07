"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const entrenadoresServicio_1 = require("../services/entrenadoresServicio");
const router = express_1.default.Router();
router.route('/')
    .get(entrenadoresServicio_1.getAllEntries)
    .post(entrenadoresServicio_1.addEntry);
router.route('/:id')
    .get(entrenadoresServicio_1.getIdEntry)
    .delete(entrenadoresServicio_1.deleteIdEntry)
    .put(entrenadoresServicio_1.updateIdEntry);
exports.default = router;
