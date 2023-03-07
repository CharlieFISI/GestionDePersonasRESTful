import { ClienteEntryWithoutId, EntrenadorEntryWithoutId, UsuarioEntryWithoutIdAndDate } from './types'

const parseNombre = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Nombre inexistente o incorrecto')
  }
  return stringFromRequest
}

const parseApellido = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Apellido inexistente o incorrecto')
  }
  return stringFromRequest
}

const parseEmail = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Email inexistente o incorrecto')
  }
  return stringFromRequest
}

const parseDNI = (stringFromRequest: any): string => {
  let flag = true
  for (let i = 0; i < stringFromRequest.length; i++) {
    if (!isInt(Number(stringFromRequest[i]))) flag = false
  }
  if (!flag) {
    throw new Error('DNI inexistente o incorrecto')
  }
  return stringFromRequest
}

const parseTelefono = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('Telefono inexistente o incorrecta')
  }
  return numberFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isInt = (int: number): boolean => {
  return ((typeof int === 'number' && !isNaN(int)) && Number.isInteger(int))
}

export const addClienteEntry = (object: any): ClienteEntryWithoutId => {
  const newEntry: ClienteEntryWithoutId = {
    Nombre: parseNombre(object.Nombre),
    Apellido: parseApellido(object.Apellido),
    Email: parseEmail(object.Email),
    DNI: parseDNI(object.DNI),
    Telefono: parseTelefono(object.Telefono)
  }
  return newEntry
}

export const addEntrenadorEntry = (object: any): EntrenadorEntryWithoutId => {
  const newEntry: EntrenadorEntryWithoutId = {
    Nombre: parseNombre(object.Nombre),
    Apellido: parseApellido(object.Apellido),
    Email: parseEmail(object.Email),
    DNI: parseDNI(object.DNI),
    Telefono: parseTelefono(object.Telefono)
  }
  return newEntry
}

export const addUsuarioEntry = (object: any): UsuarioEntryWithoutIdAndDate => {
  const newEntry: UsuarioEntryWithoutIdAndDate = {
    Nombre: parseNombre(object.Nombre),
    Apellido: parseApellido(object.Apellido),
    Email: parseEmail(object.Email),
    DNI: parseDNI(object.DNI),
    Telefono: parseTelefono(object.Telefono),
    Contrasenia: parseDNI(object.Contrasenia)
  }
  return newEntry
}
