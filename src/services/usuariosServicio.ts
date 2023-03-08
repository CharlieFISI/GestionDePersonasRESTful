import { UsuarioEntry, UsuarioEntryWithoutIdAndDate } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addUsuarioEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'
import * as crypto from 'crypto-js'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM Usuarios')
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
    const newEntry: UsuarioEntryWithoutIdAndDate = addUsuarioEntry(req.body)
    newEntry.Contrasenia = crypto.SHA512(newEntry.Contrasenia).toString()
    const conn = await connect()
    const dniUnique = await conn.query('SELECT * FROM Usuarios WHERE DNI = ?', [newEntry.DNI]) as RowDataPacket[]
    if (dniUnique[0].length !== 0) {
      return res.status(404).json({ message: 'Existe un registro con el mismo DNI' })
    }
    await conn.query('INSERT INTO Usuarios SET ?', [newEntry])
    return res.json({
      message: 'Entrada de Usuario añadida'
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
    const getId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]) as RowDataPacket[]
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
    const deleteId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]) as RowDataPacket[]
    await conn.query('DELETE FROM Usuarios WHERE UsuarioId = ?', [id])
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    return res.json({
      message: 'Entrada de Usuario eliminada'
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
    const updateEntry: UsuarioEntry = req.body
    updateEntry.Contrasenia = crypto.SHA512(updateEntry.Contrasenia).toString()
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [id]) as RowDataPacket[]
    await conn.query('UPDATE Usuarios set ? WHERE UsuarioId = ?', [updateEntry, id])
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    return res.json({
      message: 'Entrada de Usuario actualizada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
