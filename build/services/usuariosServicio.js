"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdEntry = exports.deleteIdEntry = exports.getIdEntry = exports.addEntry = exports.getAllEntries = void 0;
const conexion_1 = require("../conexion");
const utils_1 = require("../utils");
const crypto = __importStar(require("crypto-js"));
async function getAllEntries(_req, res) {
    try {
        const conn = await (0, conexion_1.connect)();
        const getAll = await conn.query('SELECT * FROM Usuarios');
        return res.json(getAll[0]);
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.getAllEntries = getAllEntries;
async function addEntry(req, res) {
    try {
        const newEntry = (0, utils_1.addUsuarioEntry)(req.body);
        newEntry.Contrasenia = crypto.SHA512(newEntry.Contrasenia).toString();
        const conn = await (0, conexion_1.connect)();
        const dniUnique = await conn.query('SELECT * FROM Usuarios WHERE DNI = ?', [newEntry.DNI]);
        const phoneUnique = await conn.query('SELECT * FROM Usuarios WHERE Telefono = ?', [newEntry.Telefono]);
        const emailUnique = await conn.query('SELECT * FROM Usuarios WHERE Email = ?', [newEntry.Email]);
        if (dniUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un usuario con el mismo DNI' });
        if (phoneUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un usuario con el mismo Telefono' });
        if (emailUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un usuario con el mismo Email' });
        await conn.query('INSERT INTO Usuarios SET ?', [newEntry]);
        return res.json({
            message: 'Entrada de Usuario añadida'
        });
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.addEntry = addEntry;
async function getIdEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const getId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]);
        if (getId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        return res.json(getId[0]);
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.getIdEntry = getIdEntry;
async function deleteIdEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const deleteId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]);
        await conn.query('DELETE FROM Usuarios WHERE UsuarioId = ?', [id]);
        if (deleteId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        return res.json({
            message: 'Entrada de Usuario eliminada'
        });
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.deleteIdEntry = deleteIdEntry;
async function updateIdEntry(req, res) {
    try {
        const { id } = req.params;
        const updateEntry = req.body;
        updateEntry.Contrasenia = crypto.SHA512(updateEntry.Contrasenia).toString();
        const conn = await (0, conexion_1.connect)();
        const updateId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]);
        await conn.query('UPDATE Usuarios set ? WHERE UsuarioId = ?', [updateEntry, id]);
        if (updateId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        return res.json({
            message: 'Entrada de Usuario actualizada'
        });
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.updateIdEntry = updateIdEntry;
