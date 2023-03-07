export interface ClienteEntry {
  ClienteId: number
  Nombre: string
  Apellido: string
  Email: string
  DNI: string
  Telefono: number
}

export interface EntrenadorEntry {
  EntrenadorId: number
  Nombre: string
  Apellido: string
  Email: string
  DNI: string
  Telefono: number
}

export interface UsuarioEntry {
  UsuarioId: number
  Nombre: string
  Apellido: string
  DNI: string
  Email: string
  Telefono: number
  Contrasenia: string
  Creado: Date
}

export type PlanEntryWithoutId = Omit<PlanEntry, 'PlanId'>
export type ClienteEntryWithoutId = Omit<ClienteEntry, 'ClienteId'>
export type ClaseEntryWithoutId = Omit<ClaseEntry, 'ClaseId'>
export type IngresoEntryWithoutId = Omit<IngresoEntry, 'IngresoId'>
export type EntrenadorEntryWithoutId = Omit<EntrenadorEntry, 'EntrenadorId'>
export type UsuarioEntryWithoutIdAndDate = Omit<UsuarioEntry, 'UsuarioId', 'Creado'>
export type FechaClaseEntryWithoutId = Omit<FechaClaseEntry, 'FechaClaseId'>
export type PlanesIngresoEntryWithoutId = Omit<PlanesIngresoEntry, 'PlanesIngresoId'>
