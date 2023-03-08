import { EntrenadorEntry, EntrenadorEntryWithoutId } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addEntrenadorEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM Entrenadores')
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
    const newEntry: EntrenadorEntryWithoutId = addEntrenadorEntry(req.body)
    const conn = await connect()
    const dniUnique = await conn.query('SELECT * FROM Entrenadores WHERE DNI = ?', [newEntry.DNI]) as RowDataPacket[]
    if (dniUnique[0].length !== 0) {
      return res.status(404).json({ message: 'Existe un registro con el mismo DNI' })
    }
    await conn.query('INSERT INTO Entrenadores SET ?', [newEntry])
    return res.json({
      message: 'Entrada de Entrenador añadida'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function getIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const getId = await conn.query('SELECT * FROM Entrenadores WHERE EntrenadorId = ?', [id]) as RowDataPacket[]
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
}

export async function deleteIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const deleteId = await conn.query('SELECT * FROM Entrenadores WHERE EntrenadorId = ?', [id]) as RowDataPacket[]
    await conn.query('DELETE FROM Entrenadores WHERE EntrenadorId = ?', [id])
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    return res.json({
      message: 'Entrada de Entrenador eliminada'
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
    const updateEntry: EntrenadorEntry = req.body
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM Entrenadores WHERE EntrenadorId = ?', [id]) as RowDataPacket[]
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    if (typeof updateEntry.DNI === 'string') {
      const [DNIUnique] = await conn.query('SELECT EntrenadorId FROM Entrenadores WHERE DNI = ?', [updateEntry.DNI]) as RowDataPacket[]
      if (DNIUnique.length !== 0 && DNIUnique.EntrenadorId !== updateEntry.EntrenadorId) {
        return res.status(404).json({ message: 'Existe un registro con el mismo DNI' })
      }
    }
    await conn.query('UPDATE Entrenadores set ? WHERE EntrenadorId = ?', [updateEntry, id])
    return res.json({
      message: 'Entrada de Entrenador actualizada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
