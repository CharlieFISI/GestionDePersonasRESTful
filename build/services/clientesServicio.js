"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdEntry = exports.deleteIdEntry = exports.getIdEntry = exports.addEntry = exports.getAllEntries = void 0;
const conexion_1 = require("../conexion");
const utils_1 = require("../utils");
async function getAllEntries(_req, res) {
    try {
        const conn = await (0, conexion_1.connect)();
        const getAll = await conn.query('SELECT * FROM Clientes');
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
        const newEntry = (0, utils_1.addClienteEntry)(req.body);
        const conn = await (0, conexion_1.connect)();
        const dniUnique = await conn.query('SELECT * FROM Clientes WHERE DNI = ?', [newEntry.DNI]);
        if (dniUnique[0].length !== 0) {
            return res.status(404).json({ message: 'Existe un registro con el mismo DNI' });
        }
        else {
            await conn.query('INSERT INTO Clientes SET ?', [newEntry]);
            return res.json({
                message: 'Entrada de Cliente añadida'
            });
        }
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
        const getId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]);
        if (getId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            return res.json(getId[0]);
        }
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
        const deleteId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]);
        if (deleteId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            await conn.query('DELETE FROM Clientes WHERE ClienteId = ?', [id]);
            return res.json({
                message: 'Entrada de Cliente eliminada'
            });
        }
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
        const conn = await (0, conexion_1.connect)();
        const dniUnique = await conn.query('SELECT * FROM Clientes WHERE DNI = ?', [updateEntry.DNI]);
        const updateId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]);
        if (updateId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            if (dniUnique.length !== 0) {
                return res.status(404).json({ message: 'Existe un registro con el mismo DNI' });
            }
            else {
                await conn.query('UPDATE Clientes set ? WHERE ClienteId = ?', [updateEntry, id]);
                return res.json({
                    message: 'Entrada de Cliente actualizada'
                });
            }
        }
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
