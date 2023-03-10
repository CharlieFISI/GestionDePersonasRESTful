import { ClienteEntry, ClienteEntryWithoutId } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addClienteEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM Clientes')
    return res.json(getAll[0])
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function addEntry (req: Request, res: Response): Promise<Response> {
  try {
    const newEntry: ClienteEntryWithoutId = addClienteEntry(req.body)
    const conn = await connect()
    const dniUnique = await conn.query('SELECT * FROM Clientes WHERE DNI = ?', [newEntry.DNI]) as RowDataPacket[]
    if (dniUnique[0].length !== 0) {
      return res.status(404).json({ message: 'Existe un registro con el mismo DNI' })
    }
    await conn.query('INSERT INTO Clientes SET ?', [newEntry])
    return res.json({
      message: 'Entrada de Cliente añadida'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

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

export async function deleteIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const deleteId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]) as RowDataPacket[]
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    await conn.query('DELETE FROM Clientes WHERE ClienteId = ?', [id])
    return res.json({
      message: 'Entrada de Cliente eliminada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function updateIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const updateEntry: ClienteEntry = req.body
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [id]) as RowDataPacket[]
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    if (typeof updateEntry.DNI === 'string') {
      const [DNIUnique] = await conn.query('SELECT ClienteId FROM Clientes WHERE DNI = ?', [updateEntry.DNI]) as RowDataPacket[]
      if (DNIUnique.length !== 0 && DNIUnique.ClienteId !== updateEntry.ClienteId) {
        return res.status(404).json({ message: 'Existe un registro con el mismo DNI' })
      }
    }
    await conn.query('UPDATE Clientes set ? WHERE ClienteId = ?', [updateEntry, id])
    return res.json({
      message: 'Entrada de Cliente actualizada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function getDNIEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const getId = await conn.query('SELECT ClienteId, DNI, Nombre, Apellido FROM Clientes WHERE DNI = ?', [id]) as RowDataPacket[]
    if (getId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el DNI especificado no existe' })
    }
    return res.json(getId[0])
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
