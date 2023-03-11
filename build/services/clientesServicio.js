"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDNIEntry = exports.updateIdEntry = exports.deleteIdEntry = exports.addEntry = exports.getAllEntries = void 0;
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
        const phoneUnique = await conn.query('SELECT * FROM Clientes WHERE Telefono = ?', [newEntry.Telefono]);
        const emailUnique = await conn.query('SELECT * FROM Clientes WHERE Email = ?', [newEntry.Email]);
        if (dniUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un cliente con el mismo DNI' });
        if (phoneUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un cliente con el mismo Telefono' });
        if (emailUnique[0].length !== 0)
            return res.status(404).json({ message: 'Existe un cliente con el mismo Email' });
        await conn.query('INSERT INTO Clientes SET ?', [newEntry]);
        return res.json({
            message: 'Entrada de Cliente añadida'
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
/* export async function getIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const getId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]) as RowDataPacket[]
    if (getId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    return res.json(getId[0])
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
} */
async function deleteIdEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const deleteId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]);
        if (deleteId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        await conn.query('DELETE FROM Clientes WHERE ClienteId = ?', [id]);
        return res.json({
            message: 'Entrada de Cliente eliminada'
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
        const conn = await (0, conexion_1.connect)();
        const updateId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]);
        if (updateId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        if (typeof updateEntry.DNI === 'string') {
            const [DNIUnique] = await conn.query('SELECT ClienteId FROM Clientes WHERE DNI = ?', [updateEntry.DNI]);
            if (DNIUnique.length !== 0 && DNIUnique.ClienteId !== updateEntry.ClienteId) {
                return res.status(404).json({ message: 'Existe un registro con el mismo DNI' });
            }
        }
        await conn.query('UPDATE Clientes set ? WHERE ClienteId = ?', [updateEntry, id]);
        return res.json({
            message: 'Entrada de Cliente actualizada'
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
async function getDNIEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const getId = await conn.query('SELECT ClienteId, DNI, Nombre, Apellido FROM Clientes WHERE DNI = ?', [id]);
        if (getId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el DNI especificado no existe' });
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
exports.getDNIEntry = getDNIEntry;
